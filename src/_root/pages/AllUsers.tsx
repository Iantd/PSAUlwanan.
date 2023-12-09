import GridPostList2 from '@/components/shared/GridPostList2';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

const AllUsers = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("")

  const deBouncedValue = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } =
  useSearchPosts(deBouncedValue)

  useEffect(() => {
    if(inView && !searchValue) fetchNextPage();
  }, [inView, searchValue])

  if(!posts){
    return(
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every
  ((item) => item.documents.length === 0)

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>        
        <h2 className='h3-bold md:h2-bold w-full'> Find Sellers </h2>
      
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
       <h3 className='body-bold md:h3-bold'>Popular Sellers today @ PSAU</h3>

       <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4
       py-2 cursor-pointer'>
        <p className='small-medium md:base-medium text-light-2'>All</p>
        <img 
        src="/assets/icons/filter.svg" 
        width={20}
        height={20}
        alt="filter" />
       </div>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ): shouldShowPosts? (
          <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>
        ): posts.pages.map((item, index) => (
          <GridPostList2 key={`page-${index}`} posts={item.documents}/>
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default AllUsers