import './style.css';

export const MainPoster = () => {
  return (
    <>
      <div className="h-[50vh]">
        <div className="h-full flex items-center justify-between">
          <div className="flex z-99999 flex-col w-[64em]">
            <div className="mb-2">
              <h1 className="text-white text-6xl font-semibold">Watch now</h1>
            </div>
            <div className="mb-2">
              <h2 className=" font-semibold text-primary  text-5xl">
                William Blacke
              </h2>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-white text-3xl">
                is an English idiot, pointer and engraver
              </p>
            </div>
          </div>
          <div className="relative h-full w-full">
            <div className="absolute z-[99] -top-[4em] -left-[20em] h-full w-[64em]">
              <div className="h-full w-full flex justify-end">
                <div
                  className={`banner h-[130%] w-full bg-cover`}
                  style={{
                    backgroundImage: `url('/banner.jpg')`,
                  }}
                ></div>

                <div className="fade-gradient w-full h-[130%] absolute"></div>

                {/* top right
                <div className="test rounded-full  w-[80rem] h-[80rem] absolute fade-gradient -top-[40rem] -right-[45rem]"></div>

                bottom right
                <div className="test rounded-full  w-[64rem] h-[64rem] absolute fade-gradient -bottom-[37.5rem] -right-[35rem]"></div>

                top left
                <div className="test rounded-full  w-[64rem] h-[64rem] absolute fade-gradient -top-[35rem] -left-[35rem]"></div>

                bottom left
                <div className="test rounded-full  w-[64rem] h-[64rem] absolute fade-gradient -bottom-[37.5rem] -left-[35rem]"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
