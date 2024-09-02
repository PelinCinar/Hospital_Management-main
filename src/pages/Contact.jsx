import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
     
      email: Yup.string()
        .required("E-mail zorunludur!")
        .email("Geçerli bir e-mail giriniz!"),
      subject: Yup.string()
     ,
      message: Yup.string()
        .required("Mesaj zorunludur!")
        .min(10, "Mesaj en az 10 karakter olmalıdır!"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // Burada form verilerini işleyebilirsiniz
      resetForm();
    },
  });

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto py-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
        Contact <span className="text-primaryColor">US</span>
        </h3>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder="example@gmail.com"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-600">{formik.errors.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Konu
            </label>
            <input
              type="text"
              id="subject"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="subject"
              onChange={formik.handleChange}
              value={formik.values.subject}
              onBlur={formik.handleBlur}
              placeholder="Size nasıl yardımcı olabiliriz?"
            />
            {formik.touched.subject && formik.errors.subject && (
              <span className="text-red-600">{formik.errors.subject}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Mesaj
            </label>
            <textarea
              id="message"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              onBlur={formik.handleBlur}
              placeholder="Lütfen ilgili mesajınızı girin..."
              rows="4"
            />
            {formik.touched.message && formik.errors.message && (
              <span className="text-red-600">{formik.errors.message}</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Gönder
            </button>
          </div>
     
        </form>
      </div>
    </section>
  );
};

export default Contact;
