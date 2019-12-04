import React from 'react';

const BookFilter = () => {
  const options = [
    { value: 'newToOld', label: 'rok vydání (nejnovější)' },
    { value: 'oldToNew', label: 'rok vydání (nejstarší)' },
    { value: 'aToZ', label: 'A - Z (název knihy)' },
    { value: 'zToA', label: 'Z - A (název knihy)' }
  ];

  const onChange = e => {
    let i = document.getElementById('selectOrder').options.selectedIndex;
    console.log(i);

    // arr === 0
    //   ? authorsBooks.sort(compareValues('date', 'desc'))
    //   : arr === 1
    //   ? authorsBooks.sort(compareValues('date'))
    //   : console.log('hi');
    console.log('sorting...');
  };

  return (
    <div className='item_search book'>
      <select name='order' id='selectOrder' onChange={onChange}>
        {options.map(o => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
        {/* <option value='newToOld'>rok vydání (nejnovější)</option>
        <option value='oldToNew'>rok vydání (nejstarší)</option>
        <option value='aToZ'>A - Z (název knihy)</option>
        <option value='zToA'>Z - A (název knihy)</option> */}
      </select>
    </div>
  );
};

export default BookFilter;
