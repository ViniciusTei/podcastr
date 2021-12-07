import styles from './styles.module.scss';
import { BsChevronLeft, BsChevronRight, BsDash } from 'react-icons/bs';

interface Pagination {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}
export default function Pagination({
  currentPage, 
  totalPages, 
  handleNextPage, 
  handlePreviousPage
}: Pagination) {

  return (
    <div className={styles.container}>
      {currentPage === 1 ? (
        <BsDash />
      ) : (
        <BsChevronLeft onClick={handlePreviousPage}/>
      )}
      <span>{currentPage} / {totalPages}</span>
      {currentPage === totalPages ? (
        <BsDash />
      ) : (
        <BsChevronRight onClick={handleNextPage}/>
      )}
    </div>
  )
}