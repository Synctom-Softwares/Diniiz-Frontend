import {
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../config/api";

const SuccessPage = () => {
  // State management
  const [sessionData, setSessionData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    tenantName: "",
    email: "",
    phone: "",
    notes: "",
    subscriptionType: "",
    planId: "",
    sessionId : ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate();

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    setFormData({
      ...formData,
      planId: orderDetails.planid,
    });
    setFormData({ ...formData, planId: orderDetails.planId });
    formData.planId = orderDetails.planId;
    formData.sessionId = sessionId;

    try {
        const tenantApi = new Api('/api/tenants');
      const response = await tenantApi.post("", formData);
      const { data } = response;
      if (data.success) {
        alert("Your tenant has been successFully created");
      }
      setIsSubmitting(false);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create tenant. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch payment session data
//   useEffect(() => {
//     const fetchSessionData = async () => {
//       setError(null);
//       const query = new URLSearchParams(window.location.search);
//       const sessionId = query.get("session_id");

//       if (!sessionId) {
//         setError("No session ID found in URL");
//         setPaymentStatus("failed");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           http://localhost:5000/api/payment/session/${sessionId}
//         );
//         const { data } = response;

//         if (data.success && data.payment_status === "paid") {
//           setPaymentStatus("success");
//           setSessionData(data);

//           // Set order details from API response
//           setOrderDetails({
//             orderId: data.metadata?.userId || "N/A",
//             planName: data.metadata?.planName || "N/A",
//             planId: data.metadata?.planId || "n/a",
//             price: data.amount_total
//               ? $${(data.amount_total / 100).toFixed(2)}
//               : "N/A",
//             paymentMethod: data.payment_method || "Credit Card",
//             date: new Date().toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             }),
//             duration:
//               data.metadata?.subscriptionType === "monthly"
//                 ? "1 Month"
//                 : "1 Year",
//             nextBillingDate: new Date(
//               data.metadata?.subscriptionType === "monthly"
//                 ? new Date().setMonth(new Date().getMonth() + 1)
//                 : new Date().setFullYear(new Date().getFullYear() + 1)
//             ).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             }),
//             features: getPlanFeatures(data.metadata?.planName),
//           });

//           // Pre-fill form with customer data
//           setFormData((prev) => ({
//             ...prev,
//             email: data.customer_email || "",
//             tenantName: data.metadata?.userId
//               ? Tenant ${data.metadata.userId}
//               : "",
//             subscriptionType: data.metadata?.subscriptionType || "",
//             plan: data.metadata?.planName || "",
//           }));
//         } else {
//           setPaymentStatus("failed");
//           setError(data.message || "Payment verification failed");
//         }
//       } catch (err) {
//         console.error("Error fetching session data:", err);
//         setPaymentStatus("failed");
//         setError(
//           err.response?.data?.message ||
//             "Failed to verify payment. Please contact support."
//         );
//       }
//     };

//     fetchSessionData();
//   }, []);

  // Helper function to determine plan features
//   const getPlanFeatures = (planName) => {
//     switch (planName) {
//       case "beginner":
//         return [
//           "Up to 10 properties",
//           "Up to 50 tenants",
//           "Basic reporting",
//           "Email support",
//         ];
//       case "professional":
//         return [
//           "Up to 50 properties",
//           "Up to 200 tenants",
//           "Advanced reporting",
//           "Priority support",
//         ];
//       case "enterprise":
//         return [
//           "Unlimited properties",
//           "Unlimited tenants",
//           "Advanced analytics",
//           "24/7 dedicated support",
//           "Custom branding",
//         ];
//       default:
//         return ["Basic features", "Email support"];
//     }
//   };

  // Render loading state
//   if (paymentStatus === "pending") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto text-center">
//           <div className="animate-pulse flex justify-center mb-6">
//             <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
//               <div className="h-8 w-8 bg-blue-400 rounded-full"></div>
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-3">
//             Verifying Payment...
//           </h1>
//           <p className="text-lg text-gray-600">
//             Please wait while we verify your payment details.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render failed payment state
//   if (paymentStatus === "failed") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="bg-red-50 px-8 py-12 text-center">
//               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
//                 <XCircleIcon className="h-10 w-10 text-red-600" />
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-3">
//                 Payment Failed
//               </h1>
//               <p className="text-lg text-gray-600 mb-6">
//                 We couldn't verify your payment. Please try again.
//               </p>
//               {error && (
//                 <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//                   {error}
//                 </div>
//               )}
//               <button
//                 onClick={() => navigate("/pricing")}
//                 className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
//               >
//                 Return to Pricing
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

  // Render success state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {orderDetails ? (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Confirmation Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="text-center pt-12 px-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircleIcon className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                Payment Successful
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto pb-8">
                Thank you for subscribing to our{" "}
                <span className="font-semibold text-indigo-600">
                  {orderDetails.planName}
                </span>
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{orderDetails.orderId}
                  </h2>
                  <p className="text-indigo-100">
                    Completed on {orderDetails.date}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="text-2xl font-bold">
                    {orderDetails.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500">Plan</p>
                <p className="font-medium">{orderDetails.planName}</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{orderDetails.duration}</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500">Next Billing</p>
                <p className="font-medium">{orderDetails.nextBillingDate}</p>
              </div>
            </div>

            {/* Plan Features */}
            <div className="px-8 py-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Plan Features
              </h3>
              <ul className="space-y-2">
                {orderDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tenant Information Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Complete Your Tenant Profile
              </h2>
              <p className="text-gray-600 mt-1">
                Help us personalize your experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="tenantName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tenant Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="tenantName"
                      name="tenantName"
                      value={formData.tenantName}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md bg-gray-50 transition duration-150 ease-in-out"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md bg-gray-50 transition duration-150 ease-in-out"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border-gray-300 rounded-md bg-gray-50 transition duration-150 ease-in-out"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md bg-gray-50 transition duration-150 ease-in-out"
                    placeholder="Any special requirements or comments..."
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Skip for Now
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create Tenant"}
                </button>
              </div>
            </form>
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">
                Need help with your account?
              </h3>
              <p className="mt-2 text-gray-600">
                Our support team is available 24/7 to assist you with any
                questions.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/support")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <XCircleIcon className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Unable to load order details
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an issue loading your order information.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;