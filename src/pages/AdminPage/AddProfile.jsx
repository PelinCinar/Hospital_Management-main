import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../fireBaseConfig"; // Firestore yapılandırmanız
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProfile = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "doctor",
    gender: "",
    profileImage: "",
    department: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    gender: Yup.string().required("Gender is required"),
    department: Yup.string().required("Department is required"),
    profileImage: Yup.string().url("Invalid URL format"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      console.log("kullanıcı başarıyla oluşturuldu:", userCredential.user);

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "doctor", // Varsayılan rol
        fullName: values.fullName,
        gender: values.gender,
        profileImage: values.profileImage ? values.profileImage : null,
        department: values.department,
        createdAt: serverTimestamp(),
      });

      toast.success("Doctor added successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding doctor: ", error);
      toast.error("Error adding doctor: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Doctor Profile</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  placeholder="Enter full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 mt-2" />
              </div>

              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  placeholder="Enter email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-2" />
              </div>

              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Department</label>
                <Field
                  as="select"
                  name="department"
                  className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Orthopedics">Orthopedics</option>
                </Field>
                <ErrorMessage name="department" component="div" className="text-red-500 mt-2" />
              </div>

              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Profile Image URL</label>
                <Field
                  type="text"
                  name="profileImage"
                  className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  placeholder="Enter profile image URL"
                />
                <ErrorMessage name="profileImage" component="div" className="text-red-500 mt-2" />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out"
                disabled={isSubmitting}
              >
                Add Doctor
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddProfile;
