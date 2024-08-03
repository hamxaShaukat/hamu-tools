'use client';
import React, { ChangeEventHandler } from 'react';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/Store/store';
import { setName } from '@/lib/feature/Name/NameSlice';
import { motion } from 'framer-motion';

const Search = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setName(e.target.value));
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <motion.div
        className="w-3/4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Input
          className="border border-gray-500 rounded-3xl py-2 px-6 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 transition-shadow duration-300 shadow-lg"
          placeholder="Search by tool name or category..."
          onChange={handleChange}
        />
      </motion.div>
    </div>
  );
};

export default Search;
