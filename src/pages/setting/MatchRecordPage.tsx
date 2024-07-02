import React, { useState } from 'react';

const tableHead = [
  { label: '매칭기록' },
  { label: '매칭날짜' },
  { label: '기간' },
  { label: '금액' },
  { label: '상태' },
];

const items = [
  {
    id: '11567',
    date: '2023-10-10',
    duration: '30일',
    price: '100000원',
    state: '진행중',
  },
  {
    id: '11568',
    date: '2023-11-10',
    duration: '60일',
    price: '200000원',
    state: '완료',
  },
  {
    id: '11569',
    date: '2023-12-10',
    duration: '90일',
    price: '300000원',
    state: '진행중',
  },
  {
    id: '11570',
    date: '2023-12-20',
    duration: '45일',
    price: '150000원',
    state: '중도취소',
  },
];

function MatchRecordPage() {
  const [filter, setFilter] = useState('전체');
  const filteredItems =
    filter === '전체' ? items : items.filter((item) => item.state === filter);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <section className="flex flex-col justify-center gap-10">
      <h1 className="text-title-small">매칭기록 관리</h1>

      <div className="mb-4 flex justify-center gap-4">
        {['전체', '완료', '진행중', '중도취소'].map((status, index) => (
          <button
            key={index}
            className={`h-[40px] w-[110px] rounded-3xl px-4 py-2 ${filter === status ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <table className="w-full border-collapse border">
        <thead className="rounded-t-xl bg-primary text-white">
          <tr>
            {tableHead.map((item, index) => (
              <th key={index} className="border px-4 py-2 text-center">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="gap-10">
          {filteredItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.date}</td>
              <td className="border px-4 py-2 text-center">{item.duration}</td>
              <td className="border px-4 py-2 text-center">{item.price}</td>
              <td className="border px-4 py-2 text-center">{item.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default MatchRecordPage;
