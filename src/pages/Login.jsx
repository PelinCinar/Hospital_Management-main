import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

const Login = () => {
  const userData = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Zorunlu alan!")
        .email("Geçerli bir e-mail giriniz!"),
      password: Yup.string()
        .required("Zorunlu alan!")
        .min(6, "Şifre en az 6 karakter olmalı!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
       
        // Firestore'dan kullanıcının rol bilgisine ulaş
        const userDoc = await getDoc(doc(db, "users", user.uid));
        console.log("User signed in:",userDoc.data());
        dispatch(setUser(userDoc.data()));

        // Kullanıcı rolüne göre yönlendirme
    

        if (userDoc.data().role === "doctor") {
          navigate("/doctor-panel");
        } else if (userDoc.data().role === "admin") {
          navigate("/admin");
        } else if (userDoc.data().role === "client") {
          navigate("/customer-panel");
        } else {
          navigate("/admin");
        }

        setErrorMessage("");
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role;
          console.log("Kullanıcının rolü:", userRole);

          // Rolü geri döndürebilirsin ya da başka bir işlem yapabilirsin
          return userRole;
        } else {
          console.error("Kullanıcı dokümanı bulunamadı.");
          return null;
        }
      } catch (error) {
        console.error("Giriş yaparken bir hata oluştu:", error);
        setErrorMessage("Giriş yaparken bir hata oluştu!");
      }

      resetForm();
    },
  });
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen relative">
      {errorMessage && (
        <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded shadow">
          {errorMessage}
        </div>
      )}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Hello! Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
          <div className="flex items-center justify-between">
            <div className="text-sm">
              Hesabınız yok mu?
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Hesap oluştur
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
