import { useState, useEffect } from 'react';
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from './FeedbackForm';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';  // Firestore yapılandırmasını içe aktarın

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });

    // Bileşen unmounted olduğunda Firestore'dan ayrıl
    return () => unsubscribe();
  }, []);

  // Yorum ekleme fonksiyonu
  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]); // Yeni yorumu yerel state'e ekle
    setShowFeedbackForm(false); // Formu kapat
  };

  return (
    <div>
      <div className='mb-[50px]'>
        <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>All reviews ({reviews.length})</h4>

        {reviews.map((review) => (
          <div className='flex justify-between gap-10 mb-[30px]' key={review.id}>
            <div className='flex gap-3'>
              <figure className='w-10 h-10 rounded-full'>
                <img className='w-full' src={avatar} alt='' />
              </figure>

              <div>
                <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>{review.name}</h5>
                <p className='text-[14px] leading-6 text-textColor'>{formateDate(review.date)}</p>
                <p className='text_para mt-3 font-medium text-[15px]'>{review.comment}</p>
              </div>
            </div>

            <div className='flex gap-1'>
              {[...Array(review.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className='text-center'>
          <button className='btn' onClick={() => setShowFeedbackForm(true)}>Give Feedback</button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm addReview={addReview} />}
    </div>
  );
};

export default Feedback;
