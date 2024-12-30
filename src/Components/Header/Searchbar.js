import { useState } from 'react'
import {
  FiCheck,
  FiChevronRight,
  FiBriefcase,
  FiClock,
  FiType,
  FiUsers,
} from 'react-icons/fi'

const SearchBar = ({ isOpen, onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    project: false,
    deadline: false,
    type: false,
    assignee: false,
  })

  if (!isOpen) return null

  const handleFilterToggle = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  return (
    <div className='absolute top-full left-0 right-0 mt-1 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-2xl z-10'>
      <div className='p-4 space-y-4'>
        {/* Filters Section */}
        <div className='space-y-2'>
          <h3 className='text-sm font-medium text-gray-700'>Add filters</h3>
          <div className='flex flex-wrap gap-2'>
            {/* Project Filter */}
            <button
              onClick={() => handleFilterToggle('project')}
              className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm transition-colors ${selectedFilters.project ? 'bg-blue-500 text-white' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <FiBriefcase className='w-4 h-4 mr-2' />
              Project
            </button>
            {/* Deadline Filter */}
            <button
              onClick={() => handleFilterToggle('deadline')}
              className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm transition-colors ${selectedFilters.deadline ? 'bg-blue-500 text-white' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <FiClock className='w-4 h-4 mr-2' />
              Deadline
            </button>
            {/* Type Filter */}
            <button
              onClick={() => handleFilterToggle('type')}
              className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm transition-colors ${selectedFilters.type ? 'bg-blue-500 text-white' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <FiType className='w-4 h-4 mr-2' />
              Type
            </button>
            {/* Assignee Filter */}
            <button
              onClick={() => handleFilterToggle('assignee')}
              className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm transition-colors ${selectedFilters.assignee ? 'bg-blue-500 text-white' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <FiUsers className='w-4 h-4 mr-2' />
              Assignee
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className='space-y-2'>
          <h3 className='text-sm font-medium text-gray-700'>Tasks</h3>
          <div className='space-y-1'>
            <div className='flex items-center p-2 hover:bg-gray-50 rounded-md group'>
              <div className='w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-yellow-400'>
                <FiCheck className='w-3 h-3 text-white' />
              </div>
              <div className='ml-3 flex-1'>
                <p className='text-sm font-medium'>Report - 01/23</p>
                <p className='text-xs text-gray-500'>
                  E-commerce stuff - Important
                </p>
              </div>
              <FiChevronRight className='w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100' />
            </div>
            <div className='flex items-center p-2 hover:bg-gray-50 rounded-md group'>
              <div className='w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-yellow-400'>
                <FiCheck className='w-3 h-3 text-white' />
              </div>
              <div className='ml-3 flex-1'>
                <p className='text-sm font-medium'>Report - 02/23</p>
                <p className='text-xs text-gray-500'>
                  E-commerce stuff - Important
                </p>
              </div>
              <FiChevronRight className='w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100' />
            </div>
            <div className='flex items-center p-2 hover:bg-gray-50 rounded-md group'>
              <div className='w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center'></div>
              <div className='ml-3 flex-1'>
                <p className='text-sm font-medium'>Report Q4</p>
                <p className='text-xs text-gray-500'>
                  Company reports - Monthly
                </p>
              </div>
              <FiChevronRight className='w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100' />
            </div>
          </div>
        </div>

        {/* Advanced Search Button */}
        <button
          onClick={onClose}
          className='w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md'
        >
          Advanced search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
