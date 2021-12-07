import styles from './styles.module.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

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
      <BsChevronLeft onClick={handlePreviousPage}/>
      <span>{currentPage} / {totalPages}</span>
      <BsChevronRight onClick={handleNextPage}/>
    </div>
  )
}