import { Button } from "./ui/button";
import {
  useCreateCheckoutSessionMutation,
  useVerifyPaymentMutation,
} from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const [verifyPayment] = useVerifyPaymentMutation();

  const purchaseCourseHandler = async () => {
    try {
      const response = await createCheckoutSession(courseId).unwrap();

      if (!response.success) {
        toast.error("Unable to create order");

        return;
      }

      const options = {
        key: response.key || import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: response.order.amount,

        currency: response.order.currency,

        name: "Excellence Tuition Classes LMS",

        description: response.course.courseTitle,

        image: response.course.courseThumbnail,

        order_id: response.order.id,

        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,

              razorpay_payment_id: paymentResponse.razorpay_payment_id,

              razorpay_signature: paymentResponse.razorpay_signature,

              courseId,
            }).unwrap();

            if (verifyResponse.success) {
              toast.success("Payment Successful");

              navigate(`/course-progress/${courseId}`);
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error("Payment failed");
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
