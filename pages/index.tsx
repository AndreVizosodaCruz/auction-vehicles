import CarList from "@/components/carList";
import Filters from "@/components/filters";
import Head from "next/head";
import styled from "styled-components";

export default function Home() {

  return (
    <>
      <Head>
        <title>Car Auction List</title>
        <meta name="description" content="Car Auction List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Filters />
        <CarList />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  height: 100vh;
  max-width: 100vw;
  gap: 12px;
  padding: 8px;
`;