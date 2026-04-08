import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();

  const result = useMemo(() => {
    const resultCode = Number(searchParams.get("resultCode"));
    const orderId = searchParams.get("orderId") || "";
    const amount = searchParams.get("amount") || "0";
    const message =
      searchParams.get("message") || "Khong co thong tin giao dich";

    return {
      isSuccess: resultCode === 0,
      resultCode: Number.isNaN(resultCode) ? null : resultCode,
      orderId,
      amount,
      message,
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background text-on-background px-6 py-16">
      <div className="max-w-xl mx-auto rounded-3xl border border-outline-variant/20 bg-surface-container/60 backdrop-blur-xl p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${result.isSuccess ? "bg-green-500/20 border border-green-500/40" : "bg-red-500/20 border border-red-500/40"}`}
          >
            <span
              className={`material-symbols-outlined text-4xl ${result.isSuccess ? "text-green-400" : "text-red-400"}`}
            >
              {result.isSuccess ? "check_circle" : "error"}
            </span>
          </div>

          <h1 className="text-3xl font-black font-headline tracking-tight">
            {result.isSuccess ? "Thanh toan thanh cong" : "Thanh toan that bai"}
          </h1>

          <p className="text-on-surface-variant text-sm">{result.message}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-outline-variant/20 bg-surface/40 p-4 space-y-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-on-surface-variant">Ma don hang</span>
            <span className="font-bold text-on-surface break-all">
              {result.orderId || "-"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-on-surface-variant">So tien</span>
            <span className="font-bold text-on-surface">
              {Number(result.amount).toLocaleString()} VND
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-on-surface-variant">Result code</span>
            <span className="font-bold text-on-surface">
              {result.resultCode ?? "-"}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/my-tickets"
            className="h-12 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary-container font-bold flex items-center justify-center"
          >
            Ve cua toi
          </Link>
          <Link
            to="/"
            className="h-12 rounded-xl border border-outline-variant/20 bg-surface-variant/40 text-on-surface font-bold flex items-center justify-center"
          >
            Ve trang chu
          </Link>
        </div>
      </div>
    </div>
  );
}
