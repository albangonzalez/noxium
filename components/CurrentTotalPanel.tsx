"use client";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default function CurrentTotalPanel() {
  const [total, setTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const today = new Date();

    fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/transactions/${today.getFullYear()}/${(today.getMonth() + 1)}`)
      .then(res => res.json())
      .then(json => setTotal(json.data[0].total))
      .then(() => setIsLoaded(true));
  }, []);

  return (
    <div className="max-w-sm mx-auto p-3 md:p-0 mb-3">
      <Card shadow="none">
        <CardBody>
          <div className="text-center">Total mes</div>
          <Skeleton isLoaded={isLoaded} className="rounded-lg w-1/3 m-auto">
            <div className="text-center text-xl text-slate-500 font-semibold">
              -${total}
            </div>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
}
