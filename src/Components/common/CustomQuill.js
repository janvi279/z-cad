import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomQuill = ({ field, form, label }) => {
  const [contentValue, setContentValue] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote'],
    ],
  };

  const editorStyles = {
    borderRadius: '8px',
    height: '200px',
    marginBottom: '40px',
  };

  return (
    <div>
      <label>{label}</label>
      <ReactQuill
        theme="snow"
        value={field.value || contentValue}
        onChange={(val) => {
          form.setFieldValue(field.name, val);
          setContentValue(val);
        }}
        modules={modules}
        style={editorStyles}
      />
    </div>
  );
};

export default CustomQuill;