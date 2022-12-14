/* eslint-disable react-hooks/exhaustive-deps */
import { Result } from "ethers/lib/utils";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useIdle } from "react-use";
import { useContractRead } from "wagmi";

import LilNounsOracleAbi from "../abis/preview.json";
import EulogyModal from "../components/EulogyModal";

const MissedLils = dynamic(() => import("../components/MissedLils"));
const InfoLil = dynamic(() => import("../components/InfoLil"));
const Wtf = dynamic(() => import("../components/Wtf"), { ssr: false });

/*

  signature for fetchNextNoun
      
  return (
    [0] blockhash(block.number - 1),
    [1] nounId,
    [2] svg,
    [3] auctionState,
    [4] nextNounSeed

  );

*/

export enum AuctionState {
  NOT_STARTED,
  ACTIVE,
  OVER_NOT_SETTLED,
  OVER_AND_SETTLED,
}

const Home: NextPage = () => {
  const [lilData, setLilData] = useState<Result | undefined>();

  const { data, isFetching, isFetched } = useContractRead({
    addressOrName: "0x6c3810649c140d2f43Ec4D88B2f733e1375E4C74",
    contractInterface: LilNounsOracleAbi,
    functionName: "fetchNextNoun",
    watch: true,
    overrides: { blockTag: "pending" },
  });

  const isIdle = useIdle(60e3);

  useEffect(() => {
    if (data?.[3] === AuctionState.ACTIVE || isIdle) return;

    setLilData(data);
  }, [data, isIdle]);

  const [open, setOpen] = useState(false);
  const [selectedLil, setSelectedLil] = useState({});

  return (
    <div className="bg-white h-full w-full">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Lil Block Party</title>
        <meta name="description" content="Watch the blocks. Pick a lil. Join the party" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.lilblockparty.wtf" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lil Block Party" />
        <meta property="og:description" content="Watch the blocks. Pick a lil. Join the party" />
        <meta property="og:image" content="https://www.lilblockparty.wtf/images/og.jpeg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="lilblockparty.wtf" />
        <meta property="twitter:url" content="https://www.lilblockparty.wtf" />
        <meta name="twitter:title" content="Lil Block Party" />
        <meta name="twitter:description" content="Watch the blocks. Pick a lil. Join the party" />
        <meta name="twitter:image" content="https://www.lilblockparty.wtf/images/og.jpeg" />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>
      <div className="mx-auto">
        <div className="bg-[#22212C] ">
          <InfoLil data={lilData} isFetching={isFetching} isFetched={isFetched} />
        </div>
        <MissedLils
          data={lilData}
          isFetching={isFetching}
          isFetched={isFetched}
          setModalOpen={setOpen}
          setSelectedLil={setSelectedLil}
        />
      </div>

      <Wtf />
      <EulogyModal open={open} setOpen={setOpen} selectedLil={selectedLil} data={data} />
    </div>
  );
};
export default Home;
