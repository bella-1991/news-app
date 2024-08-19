import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdLastPage } from '@react-icons/all-files/md/MdLastPage';
import { MdFirstPage } from '@react-icons/all-files/md/MdFirstPage';
import { MdChevronRight } from '@react-icons/all-files/md/MdChevronRight';
import { MdChevronLeft } from '@react-icons/all-files/md/MdChevronLeft';
import { handlePhangePage } from '../../features/news/newsSlice';
import keygen from '../../helpers/keygen';
import styles from './pagination.module.scss';

const Pagination = ({
  currentPage = 1,
  pagePath = '#',
  totalPages = 5,
  previousComp = <MdChevronLeft />,
  nextComp = <MdChevronRight />,
  firstComp = <MdFirstPage />,
  lastComp = <MdLastPage />,
  anchorLabel,
  pageNeighbours = 1,
  showFirstLast = false,
  showPrevNext = true,
  showOf = false,
  hidePrevious = false,
  hideNext = false,
}) => {
  const dispatch = useDispatch();

  const current = Number(currentPage);
  const total = Number(totalPages);

  function getPagePath(index) {
    dispatch(handlePhangePage(index));
  }

  const midPoints = 'MID';

  useEffect(() => {
    const hash = window?.location?.hash?.replace('#', '');
    document?.getElementById(hash)?.scrollIntoView();
  });

  const range = (from, to, step = 1) => {
    let i = from;
    const rangeArr = [];

    while (i <= to) {
      rangeArr.push(i);
      i += step;
    }

    return rangeArr;
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 2;
    const totalBlocks = totalNumbers + 2;

    if (total > totalBlocks - 1) {
      let pages = [];

      const leftBound = current - pageNeighbours;
      const rightBound = current + pageNeighbours;
      const beforeLastPage = total - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [midPoints, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, midPoints];
      } else if (leftSpill && rightSpill) {
        pages = [midPoints, ...pages, midPoints];
      }

      return [1, ...pages, total];
    }

    return range(1, total);
  };

  return (
    <ul className={styles.pagination || ''}>
      {/* got to first page */}
      {showFirstLast && (
        <li className={styles.goToFirst || ''}>
          {current > 1 ? (
            <Link
              onClick={() => getPagePath(1)}
              className={`${styles.button || ''} ${styles.isActive || ''}`}
            >
              {firstComp}
            </Link>
          ) : (
            <span className={styles.button || ''}>{firstComp}</span>
          )}
        </li>
      )}
      {/* go to previous page */}
      {showPrevNext && (
        <li className={styles.goToPrevious || ''}>
          {current > 1 ? (
            <Link
              onClick={() => getPagePath(current - 1)}
              className={`${styles.button || ''} ${styles.isActive || ''}`}
            >
              {previousComp}
            </Link>
          ) : (
            <span className={styles.button || ''}>{previousComp}</span>
          )}
        </li>
      )}

      {/* start pages */}
      <li>
        <ul className={styles.pages || ''}>
          {/* show [current page] of [total pages] */}
          {showOf ? (
            <>
              <li className={styles.showOfCurrent || ''}>
                <span>{current}</span>
                of
                <span>{total}</span>
              </li>
            </>
          ) : (
            fetchPageNumbers().map((page) => {
              /* show mid points */
              if (page === midPoints) {
                return (
                  <li key={keygen()} className={`${styles.page || ''} ${styles.midPoints || ''}`}>
                    <span>...</span>
                  </li>
                );
              }

              /* previous page */
              if (page === current - 1) {
                return (
                  !hidePrevious && (
                    <li key={keygen()} className={`${styles.previousPage || ''} `}>
                      {current === page ? (
                        <span>{page}</span>
                      ) : (
                        <Link onClick={() => getPagePath(page)} className="pagination-gtm">
                          {page}
                        </Link>
                      )}
                    </li>
                  )
                );
              }

              /* next page */
              if (page === current + 1) {
                return (
                  !hideNext && (
                    <li key={keygen()} className={`${styles.nextPage || ''} `}>
                      {current === page ? (
                        <span>{page}</span>
                      ) : (
                        <Link onClick={() => getPagePath(page)} className="pagination-gtm">
                          {page}
                        </Link>
                      )}
                    </li>
                  )
                );
              }

              /* first and last pages, current page & extra pages */
              return (
                <li
                  key={keygen()}
                  className={`${styles.page || ''} ${current === page ? styles.active || '' : ''} ${
                    page === 1 ? styles.firstPage || '' : ''
                  } ${page === total ? styles.lastPage || '' : ''} `}
                >
                  <Link onClick={() => getPagePath(page)} className="pagination-gtm">
                    {page}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </li>
      {/* end pages */}

      {/* next button */}
      {showPrevNext && (
        <li className={styles.goToNext || ''}>
          {current < total ? (
            <Link
              onClick={() => getPagePath(current + 1)}
              className={`${styles.button || ''} ${styles.isActive || ''}`}
            >
              {nextComp}
            </Link>
          ) : (
            <span className={styles.button || ''}>{nextComp}</span>
          )}
        </li>
      )}
      {/* got to last page */}
      {showFirstLast && (
        <li className={styles.goToLast || ''}>
          {current !== total ? (
            <Link
              onClick={() => getPagePath(total)}
              className={`${styles.button || ''} ${styles.isActive || ''}`}
            >
              {lastComp}
            </Link>
          ) : (
            <span className={styles.button || ''}>{lastComp}</span>
          )}
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pagePath: PropTypes.string.isRequired,
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  nextComp: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  previousComp: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  firstComp: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  lastComp: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  anchorLabel: PropTypes.string,
  pageNeighbours: PropTypes.number,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  showOf: PropTypes.bool,
  hidePrevious: PropTypes.bool,
  hideNext: PropTypes.bool,
};

export default Pagination;
