import { useState, useRef, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const CustomActions = ({ options = [] }) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const toggle = () => setOpen((prev) => !prev)

  useEffect(() => {
    if (!open || !buttonRef.current) return

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    const rect = buttonRef.current.getBoundingClientRect()
    const dropdownHeight = dropdownRef.current?.offsetHeight || 150

    const spaceBelow = window.innerHeight - rect.bottom
    const shouldFlip = spaceBelow < dropdownHeight

    setPosition({
      top: shouldFlip
        ? rect.top + window.scrollY - dropdownHeight - 4
        : rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX - 120,
    })

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className='inline-block'>
      <button
        ref={buttonRef}
        type='button'
        onClick={toggle}
        aria-haspopup='menu'
        aria-expanded={open}
        className='p-2 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer'
      >
        <BsThreeDotsVertical size={18} />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          role='menu'
          className='fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]'
          style={{ top: position.top, left: position.left }}
        >
          {options.map((option, index) => (
            <button
              key={index}
              type='button'
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer
                first:rounded-t-lg last:rounded-b-lg ${option.className || ''}`}
              onClick={() => {
                option.onClick()
                setOpen(false)
              }}
            >
              <div className='flex items-center gap-2'>
                {option.icon && (
                  <span className='text-base'>{option.icon}</span>
                )}
                {option.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomActions
