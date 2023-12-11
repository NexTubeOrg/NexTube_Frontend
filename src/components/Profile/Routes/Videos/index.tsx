import { Link, NavLink, Outlet } from 'react-router-dom';
import CheckboxOne from '../../../CheckboxOne';
import { VideoItem } from '../../../Videos/VideoItem';
import { PrimaryProcessingButton } from '../../../common/buttons/PrimaryProcessingButton';
import { PrimaryButtonLink } from '../../../common/links/PrimaryButtonLink';

const EditVideoItem = () => {
  return (
    <>
      <tr className="border-t-2 border-primary">
        <td className="pb-2 text-left">
          <div className="">
            <CheckboxOne text="" onChange={() => {}}></CheckboxOne>
          </div>
        </td>
        <td className="pb-2 text-left">
          <div className="item flex mt-3">
            <div className="video mr-3">
              <Link to={'/watch/1'}>
                <div className="w-40 h-25 bg-white"></div>
              </Link>
            </div>

            <div className="text">
              <Link to={'/watch/1'}>
                <h3 className="text-white text-lg">Video title</h3>
              </Link>
              <p className="text-gray">Add description</p>
            </div>
          </div>
        </td>
        <td className="pb-2 text-left">
          <span>153K</span>
        </td>
        <td className="pb-2 text-left">
          <span>2342</span>
        </td>
        <td className="pb-2 text-right">
          <NavLink className="text-primary uppercase font-semibold" to={''}>
            Edit draft
          </NavLink>
        </td>
      </tr>
    </>
  );
};

export const ProfileVideos = () => {
  return (
    <>
      <Outlet></Outlet>

      <table className="text-gray w-full table-auto align-top">
        {/* dont touch below */}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div className="relative">
              <div className="absolute right-0 bottom-2">
                <div className="flex items-end w-full justify-end">
                  <div className="w-30">
                    <PrimaryButtonLink
                      urlTo="addVideo"
                      title="Add"
                    ></PrimaryButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th className="pb-2 text-left">
            <CheckboxOne text="" onChange={() => {}}></CheckboxOne>
          </th>
          <th className="pb-2 text-left">Videos</th>
          <th className="pb-2 text-left">Views</th>
          <th className="pb-2 text-left">Comments</th>
          <th className="pb-2 text-right">Likes (vs dislikes)</th>
        </tr>
        {/* render videos here */}
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
        <EditVideoItem></EditVideoItem>
      </table>
    </>
  );
};
