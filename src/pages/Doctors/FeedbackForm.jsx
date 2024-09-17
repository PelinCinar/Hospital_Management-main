import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';  // Firestore yapılandırmasını içe aktarın

const FeedbackForm = ({ addReview }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newReview = {
      name,
      date: new Date().toLocaleDateString(),
      rating,
      comment,
    };

    try {
      // Yorum Firestore'a ekleniyor
      await addDoc(collection(db, 'reviews'), newReview);
      addReview(newReview); // Yerel state'e ekleme
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-5'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Your Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Your Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Rating</label>
        <div className='flex gap-1'>
          {[...Array(5).keys()].map((_, index) => (
            <AiFillStar
              key={index}
              size={30}
              color={index < rating ? '#0067FF' : '#ccc'} 
              onClick={() => setRating(index + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

      <div className='text-center'>
        <button type='submit' className='btn' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
