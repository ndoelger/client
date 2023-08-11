import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getTopArtists } from "../spotify";
import ArtistsGrid from "../components/ArtistsGrid";
import SectionWrapper from "../components/SectionWeapper";
import TimeRangeButtons from "../components/TimeRangeButtons";

export default function TopArtists() {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtists.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  console.log(topArtists);

  return (
    <>
      <main>
        {topArtists && (
          <SectionWrapper title="Top Artists" breadcrumb="true">
            <TimeRangeButtons
              activeRange={activeRange}
              setActiveRange={setActiveRange}
            />
            <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
          </SectionWrapper>
        )}
      </main>
    </>
  );
}
