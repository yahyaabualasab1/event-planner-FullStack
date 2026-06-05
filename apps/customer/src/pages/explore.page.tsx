import {listingsSearch} from '../widget/listings-search';
import { ListingCard } from '../widget/listing-card';
export const ExplorePage = () => {
  return (
    <div>
        <h1 className="text-2xl font-semibold text-slate-900">Explore</h1>
        <p className="mt-2 text-slate-500">
            Discover new destinations and experiences. Connect this page to your explore API when you are ready.
        </p>
        {listingsSearch()}
    </div>
  );
}