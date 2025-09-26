"use client";

import styled from "@emotion/styled";
import Menu from "@/components/menu";
import CartDrawer from "@/components/drawer";
import { useMenuStore } from "@/store";
import { useEffect } from "react";
import api from "@/api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
  font-family: 'SUSE', sans-serif;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #313131;
  margin: 0;
`;

export default function Home() {
  const menuStore = useMenuStore(state => state);
  const fetchMenu = async () => {
    try {
      const response = await api.get('/menu');
      const data = response.data;
      console.log(data.Items);
      menuStore.setMenu(data.Items);
    } catch (error) {
      console.error('Error fetching menu:', error);
    };
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Container>
      <div style={{ maxWidth: "1000px", display: "flex", flex: 1, flexDirection: "column", alignItems: "start", gap: "1em" }}>
        <div style={{ 
          flexDirection: "row", 
          display: "flex", 
          width: '100%', 
          justifyContent: "space-between", 
          alignItems: "center",
          // borderBottom: '1px solid #e0e0e0', 
          // paddingBottom: '1em',
          paddingTop: '1em'
        }}>
          <Title>Cool Restaurant</Title>
          <CartDrawer />
        </div>
        <Menu />
      </div>
    </Container>
  );
}
