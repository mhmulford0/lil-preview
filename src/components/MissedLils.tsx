/* eslint-disable react-hooks/exhaustive-deps */
import type { Result } from "ethers/lib/utils";
import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { AuctionState } from "../pages";

interface Props {
  data: Result | undefined;
  isFetching: boolean;
  isFetched: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MissedLils({ data, isFetched, isFetching, setModalOpen }: Props) {
  const imgData = data?.[2];

  const [missedList, setMissedList] = useState([
    {
      imgData: "",
    },
  ]);
  useLayoutEffect(() => {
    return () => {
      if (typeof imgData == "string" && imgData.length > 0) {
        if (missedList.length < 3) {
          setMissedList((prevArray) => [...prevArray, { imgData }]);
        }

        if (missedList.length >= 3 && isFetched && !isFetching && typeof imgData == "string") {
          setMissedList((prevArray) => {
            prevArray.shift();
            return [...prevArray, { imgData }];
          });
        }
      }
    };
  }, [imgData]);

  if (missedList.length === 0) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl sm:py-12 sm:px-6 md:px-0 lg:max-w-6xl" />
      </div>
    );
  }

  return (
    <div className="bg-white hidden md:block">
      <div className="mx-auto max-w-2xl sm:py-12 sm:px-6 md:px-0 lg:max-w-6xl">
        {missedList.length > 0 && (
          <h2 className="text-4xl font-bold text-gray-900">
            {missedList.length > 0 && "In Memorium"}
          </h2>
        )}
        <div className="flex pb-10 pt-1 w-full">
          <div className="flex flex-nowrap gap-x-3 py-8 ">
            {missedList?.map((lil, index) => {
              if (!lil.imgData) return;
              return (
                <div
                  key={index}
                  className="group relative drop-shadow-md max-w-[256px] filter grayscale hover:filter-none"
                >
                  <div className=" rounded-md bg-gray-200  lg:aspect-none ">
                    <img
                      width={208}
                      height={208}
                      src={`data:image/svg+xml;base64,${lil.imgData}`}
                      className=" object-cover object-center"
                      alt="lil"
                      onClick={() => setModalOpen(true)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
