import Loader from './Loader';
import { Models } from 'appwrite';
import GridPostList from './GridPostList';

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];  // Adjust the type here
};

const SearchResults: React.FC<SearchResultsProps> = ({ isSearchFetching, searchedPosts }) => {
    if(isSearchFetching) return <Loader />

    if(searchedPosts && searchedPosts.documents.length > 0){
      return (
        <GridPostList posts={searchedPosts.documents} />
      )
    }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No Results Found</p>
  )
}

export default SearchResults