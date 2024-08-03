import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/Store/store'
import { setCategory } from '@/lib/feature/Category/Category'

const categories = ['All', 'AI & Assistance', 'Marketing', 'Tech', 'Fintech', 'UI/UX Tools', 'Startups'];

const CategoryNavbar = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: RootState) => state.category.value);

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className='flex items-center justify-center py-4'>
        <ul className='flex flex-wrap justify-center items-center gap-4'>
          {categories.map((category, index) => (
            <motion.li 
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-3 cursor-pointer text-white rounded-full shadow-md transition-colors duration-300 ease-in-out ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500' 
                  : 'hover:bg-gradient-to-r from-green-500 to-teal-500'
              }`}
            >
              {category}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default CategoryNavbar
