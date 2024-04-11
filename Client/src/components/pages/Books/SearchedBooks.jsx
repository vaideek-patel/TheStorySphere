import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBooks, searchBooks } from '../../../utils/axios-instance';

const SearchedBooks = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keywords = queryParams.get('keywords');
  console.log(keywords)


  useEffect(() => {
    const fetchSearchedBooks = async () => {
      if (keywords) {
        const result = await searchBooks(keywords);
        if (result.success) {
          console.log(result.data);
        } else {
          console.error('Error fetching searched books:', result.error);
        }
      }
    };

    fetchSearchedBooks();
  }, [keywords]);

  return (
    <div className="text-center">
        <h2 className='playfair-display-mygooglefont'>Searched Results</h2>
      </div>
  );
};

export default SearchedBooks;
