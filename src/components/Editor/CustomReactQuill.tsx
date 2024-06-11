import { memo, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CustomReactQuillProps {
  onChange: (value: string) => void;
}

function CustomReactQuill({ onChange: handleChange }: CustomReactQuillProps) {
  const quillRef = useRef<ReactQuill>(null);
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: ['#000', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'video'],
        ['clean'],
      ],
    }),
    []
  );
  return (
    <ReactQuill
      ref={quillRef}
      placeholder="내용을 입력하세요."
      onChange={handleChange}
      modules={modules}
    />
  );
}

export default memo(CustomReactQuill);
