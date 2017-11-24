function orderNumber (currentPage, pageSize, number) {
  return (currentPage - 1) * pageSize + (number + 1);
}

export default orderNumber;
