import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Button } from '@/components/ui/button';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
const YourCart = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue] = useState("");

  const deBouncedValue = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(deBouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className='explore-container text-center'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full '>Your Cart</h2>
        <div className='flex gap-2 px-8 w-full rounded-lg bg-dark-4'>
          {/* ... (previous code) */}
        </div>
      </div>

      <div className='flex-between w-5xl mt-16 mb-10'>
        <h3 className='body-bold md:h3-bold'>List of your Orders</h3>
        {/* ... (previous code) */}
      </div>

      <div className='flex flex-wrap flex-1 gap-9 w-full'>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents || []}
          />
        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>
        ) : (
          posts.pages.map((item: { documents: any; }, index: any) => (
            <GridPostList
              key={`page-${index}`}
              posts={item?.documents ?? []} // Nullish coalescing operator
            />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
      <div >
        <Button type="submit" className="shad-button_primary">Proceed to Check Out</Button>
      </div>
    </div>
  );
};

export default YourCart;