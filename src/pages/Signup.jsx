import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import signupImg from "../assets/images/signup.gif";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../fireBaseConfig";

const Signup = () => {
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      gender: "",
      profileImage: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Zorunlu alan!")
        .min(2, "İsim en az 2 karakter olmalı!"),
      email: Yup.string()
        .required("Zorunlu alan!")
        .email("Geçerli bir e-mail giriniz!"),
      password: Yup.string()
        .required("Zorunlu alan!")
        .min(6, "Şifre en az 6 karakter olmalı!"),
      confirmPassword: Yup.string()
        .required("Zorunlu alan!")
        .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor!"),
      role: Yup.string()
        .required("Rol seçimi zorunludur!"),
      gender: Yup.string()
        .required("Cinsiyet seçimi zorunludur!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Add user data to Firestore
        await addDoc(collection(db, "users"), {
          fullName: values.fullName,
          email: values.email,
          password: values.password, // Consider hashing passwords before storing them
          role: values.role,
          gender: values.gender,
          profileImage: values.profileImage ? values.profileImage.name : null, // You might need to upload this to Firebase Storage separately
        });

        console.log("User data successfully added to Firestore!");

        // Redirect or do something after successful signup
        // e.g., navigate("/login");

        resetForm();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("profileImage", file);
    
    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* img box */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="Signup"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>

          {/* sign up form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="fullName"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <span className="text-red-600">{formik.errors.fullName}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-600">{formik.errors.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-600">{formik.errors.password}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <span className="text-red-600">{formik.errors.confirmPassword}</span>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" label="Select a role" />
                    <option value="doctor" label="Doctor" />
                    <option value="patient" label="Patient" />
                  </select>
                  {formik.touched.role && formik.errors.role && (
                    <span className="text-red-600">{formik.errors.role}</span>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" label="Select gender" />
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <span className="text-red-600">{formik.errors.gender}</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="profileImage"
                  onChange={(event) => handleFileChange(event)}
                  onBlur={formik.handleBlur}
                />
                {profileImagePreview && (
                  <img
                    src={profileImagePreview}
                    alt="Profile Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-full"
                  />
                )}
                {formik.touched.profileImage && formik.errors.profileImage && (
                  <span className="text-red-600">{formik.errors.profileImage}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
