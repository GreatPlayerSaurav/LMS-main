import Razorpay from "razorpay";
import crypto from "crypto";

import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

 const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,

   key_secret: process.env.RAZORPAY_KEY_SECRET,
 });

// CREATE RAZORPAY ORDER
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;

    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // create pending purchase

    const newPurchase = new CoursePurchase({
      courseId,

      userId,

      amount: course.coursePrice,

      status: "pending",
    });

    await newPurchase.save();

    const options = {
      amount: course.coursePrice * 100,

      currency: "INR",

      receipt: newPurchase._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,

      order,

      course,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Payment order creation failed",
    });
  }
};

// VERIFY RAZORPAY PAYMENT

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto

      .createHmac(
        "sha256",

        process.env.RAZORPAY_KEY_SECRET,
      )

      .update(body)

      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,

        message: "Payment verification failed",
      });
    }

    const purchase = await CoursePurchase.findOne({
      courseId,

      userId: req.id,

      status: "pending",
    }).populate("courseId");

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    purchase.status = "completed";

    purchase.paymentId = razorpay_payment_id;

    await purchase.save();

    // unlock lectures

    if (purchase.courseId && purchase.courseId.lectures.length > 0) {
      await Lecture.updateMany(
        {
          _id: {
            $in: purchase.courseId.lectures,
          },
        },

        {
          $set: {
            isPreviewFree: true,
          },
        },
      );
    }

    // update user

    await User.findByIdAndUpdate(
      purchase.userId,

      {
        $addToSet: {
          enrolledCourses: purchase.courseId._id,
        },
      },
    );

    // update course

    await Course.findByIdAndUpdate(
      purchase.courseId._id,

      {
        $addToSet: {
          enrolledStudents: purchase.userId,
        },
      },
    );

    return res.status(200).json({
      success: true,

      message: "Course purchased successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Payment verification error",
    });
  }
};

// COURSE DETAILS

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;

    const userId = req.id;

    const course = await Course.findById(courseId)

      .populate("creator")

      .populate("lectures");

    const purchased = await CoursePurchase.findOne({
      userId,

      courseId,

      status: "completed",
    });

    return res.status(200).json({
      course,

      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
