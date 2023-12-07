import {
  ArrowDownTrayIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/20/solid';
import { ChannelPhoto } from '../ChannelPhoto';
import { IconedProcessingButton } from '../common/buttons/IconedButton';
import { PrimaryProcessingButton } from '../common/buttons/PrimaryProcessingButton';
import { SecondaryProcessingButton } from '../common/buttons/SecondaryProcessingButton';
import { DoubleIconedProcessingButton } from '../common/buttons/DoubleIconedButton';
import { Link } from 'react-router-dom';
import { CollapseText } from '../common/CollapseText';
import SubscribeButton from '../../pages/Subscription/UpdateUser/Subscription';
import UpdateUser from '../../pages/UpdateUser/UpdateUser';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/reducers/auth/types';

const WatchVideo = () => {

  return (
    <>
      <div className="warp">
        {/* video player */}
        <div className="video w-full h-125 bg-warning">video player</div>
        {/* video title */}
        <div className="mt-5 ml-5">
          <h3 className="text-white text-3xl">
            Video title long | How we can do it by the way
          </h3>
        </div>
        {/* actions section */}
        <div className="ml-5 flex justify-between items-center">
          <Link to={'/channel/1'}>
            <div className="flex mt-5 items-center">
              <div className="rounded-full h-16 w-16 bg-success"></div>
              <div className="ml-5">
                <h3 className="text-white text-xl">Channel name 1</h3>
                <h3 className="text-gray text-md">3.23M subscribers</h3>
              </div>
            </div>
          </Link>
       
      
          <div className="">
              <SubscribeButton
              
              isLoading={false}
                onClick={() => {}}
               text ="Subscribe"
                type="button"
                 backgroundClassname="primary"
                subscribeId={40}
              ></SubscribeButton>
            </div>
          <div className="likes flex">
            <div className="flex mr-5">
              <DoubleIconedProcessingButton
                isLoadingLeft={false}
                onClickLeft={() => {}}
                textLeft="59K"
                typeLeft="button"
                backgroundClassnameLeft="primary"
                iconLeft={<HandThumbUpIcon></HandThumbUpIcon>}
                isLoadingRight={false}
                onClickRight={() => {}}
                textRight=""
                typeRight="button"
                iconRight={<HandThumbDownIcon></HandThumbDownIcon>}
                backgroundClassnameRight="secondary"
              ></DoubleIconedProcessingButton>
            </div>
            <div className="mr-5">
              <IconedProcessingButton
                isLoading={false}
                onClick={() => {}}
                text="Share"
                type="button"
                icon={<ShareIcon></ShareIcon>}
                backgroundClassname="secondary"
              ></IconedProcessingButton>
            </div>
            <div className="">
              <IconedProcessingButton
                isLoading={false}
                onClick={() => {}}
                text="Download"
                type="button"
                icon={<ArrowDownTrayIcon></ArrowDownTrayIcon>}
                backgroundClassname="secondary"
              ></IconedProcessingButton>
            </div>
          </div>
        </div>
        <div>
        <Link to="/update-user">Перейти на сторінку "Про нас"</Link>

        </div>
        {/* video info */}
        <div className="description bg-secondary p-5 mt-5 rounded-lg">
          <h3 className="text-white text-2xl">
            <span className="mr-5">832K</span>
            <span>3 days ago</span>
          </h3>
          <CollapseText
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            iure veritatis aliquid hic et, maiores doloribus. Voluptatem nobis
            reiciendis odit ipsam fugiat quibusdam asperiores id blanditiis,
            iusto eos voluptas mollitia. Et accusantium voluptatibus deserunt
            mollitia vel dolorem iure. Ipsa, culpa. Eveniet assumenda explicabo
            quos nobis. Dolor eius possimus nulla facilis ex neque et
            consectetur ducimus corporis dicta, veritatis voluptates amet.
            Consectetur a totam rerum recusandae officiis, quas beatae!
            Repudiandae neque molestias officiis repellat dicta, iusto beatae,
            tempora, nesciunt fugiat perferendis rem minus odio accusamus sit
            suscipit delectus laboriosam sed vero. Amet ducimus excepturi
            aperiam quia porro illum debitis animi, vitae sit id magnam. At
            distinctio provident incidunt cupiditate exercitationem ad expedita
            amet voluptas, eveniet temporibus rerum accusantium odit veniam
            corporis. Hic suscipit et similique modi odio id quam cum vitae
            reiciendis aliquam sed, explicabo amet! Tempora veniam numquam,
            voluptas ab saepe magni accusantium repellat suscipit dolores sint
            enim sed necessitatibus. Nihil dolorum ipsum similique odio itaque
            adipisci tenetur beatae laudantium delectus inventore numquam rem
            quo officia aut obcaecati laboriosam quod dolores sit expedita
            consequuntur qui quam quaerat, id vel? In. Est doloremque maxime
            commodi vitae enim nemo dignissimos impedit quo, voluptatibus sit!
            Distinctio nemo aspernatur quae possimus modi id a architecto
            doloremque fugiat aliquam, neque quam deleniti eum consectetur? Id!
            Soluta voluptates sunt libero repellat iusto aperiam totam amet nam
            maiores eligendi, ipsa, nemo dolorum voluptate commodi facilis, ea
            tenetur odit. Expedita vitae ipsa reiciendis illum, at error
            deserunt veritatis! Qui saepe necessitatibus voluptatum neque dicta
            veritatis obcaecati fugiat sint, animi consectetur? Autem delectus
            pariatur saepe eos voluptatibus vel ut quae commodi incidunt,
            accusantium iusto optio, vitae assumenda, veniam corporis. Pariatur
            consectetur quia at numquam fugit, natus dolore animi quidem quasi
            neque suscipit doloribus repudiandae autem hic veniam fuga magni,
            voluptatum iste ratione dicta laudantium inventore quae voluptatem.
            Asperiores, ipsam. Qui cumque sint sapiente iure quod animi labore,
            quos expedita accusantium? Sint, minima animi tenetur nobis numquam
            maiores deserunt perferendis, hic deleniti rem earum neque molestias
            adipisci aliquam quisquam laborum. Ipsa amet consequatur accusantium
            repellendus non repellat nemo libero adipisci, voluptatem voluptatum
            culpa laudantium similique corrupti sapiente vel impedit fugiat
            voluptas. Architecto et quasi provident, assumenda alias facere
            asperiores iure? Quia eveniet fugit incidunt ipsum voluptates
            doloremque dolorem quam, corporis rem iure suscipit explicabo! Atque
            ad porro ex dicta soluta numquam aliquam id, accusamus blanditiis
            eaque eligendi doloribus esse labore. Enim nulla quaerat commodi,
            consectetur cum reprehenderit eaque recusandae eligendi veritatis
            inventore, iusto ex voluptatibus delectus ducimus, pariatur facilis
            esse nisi ipsam architecto voluptate. Maiores accusamus tempora vel
            id expedita! Vitae laborum pariatur enim! Aliquid rem velit ad,
            ipsum dignissimos similique, mollitia provident sed maxime
            repudiandae aperiam fuga doloremque architecto repellat ipsam veniam
            odio, vitae dolorem sint soluta eveniet in! Natus veniam dicta
            molestias possimus odio cupiditate magni totam culpa, error aperiam
            doloribus, voluptatum illo molestiae tenetur, et vero modi iste
            recusandae dignissimos. Molestiae expedita distinctio maiores in
            unde modi!"
          ></CollapseText>
        </div>
      </div>
    </>
  );
};

export { WatchVideo };
