"use client";

import List from "@repo/ui/list";
import { ShowInformation } from "../src/entities/main/ui/showInformation";
import Header from "../src/shared/ui/header";
import { useEffect, useState } from "react";
import { getCertification } from "../src/entities/main/api/getCertification";
import { Certification } from "../src/entities/main/model/certification";
import Card from "@repo/ui/card";
import ShowLogin from "../src/entities/main/ui/showLogin";
import { Button } from "@repo/ui/button";

export default function page() {
  const [certification, setCertification] = useState<Certification[]>();
  useEffect(() => {
    const Fetch = async () => {
      const res = await getCertification();
      setCertification(res);
    };
    Fetch();
  }, []);
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Header />
      <div className="w-full max-w-[37.5rem] flex flex-col">
        {localStorage.getItem("accessToken") ? (
          <ShowInformation name="모태환" score={2300} />
        ) : (
          <ShowLogin />
        )}
        <div className="flex items-center gap-10">
          <Button label="독서" variant="skyblue" onClick={() => console.log()} />
          <Button label="인성" variant="skyblue" onClick={() => console.log()} />
          <Button label="전공" variant="skyblue" onClick={() => console.log()} />
          <Button label="외국어" variant="skyblue" onClick={() => console.log()} />
        </div>
        <div className="flex flex-col mt-9">
          <List title="자격증">
            {certification?.map((v, i) => {
              return <Card key={i} front={v.name} />;
            })}
          </List>
        </div>
      </div>
    </div>
  );
}
