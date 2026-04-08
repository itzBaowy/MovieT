import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ShowtimeService from "../../../services/showtime/ShowtimeService.js";
import PaymentService from "../../../services/payment/PaymentService.js";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const [isConfirming, setIsConfirming] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

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

  const momoResultPayload = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  useEffect(() => {
    const confirmBooking = async () => {
      if (!result.isSuccess) return;

      const orderLockKey = `booking_confirmed_${result.orderId}`;
      if (result.orderId && sessionStorage.getItem(orderLockKey) === "done") {
        setBookingDone(true);
        return;
      }

      if (
        result.orderId &&
        sessionStorage.getItem(orderLockKey) === "processing"
      ) {
        return;
      }

      const pendingBookingRaw = localStorage.getItem("pending_booking");
      if (!pendingBookingRaw) return;

      let pendingBooking;
      try {
        pendingBooking = JSON.parse(pendingBookingRaw);
      } catch (error) {
        localStorage.removeItem("pending_booking");
        return;
      }

      if (
        !pendingBooking?.showtimeId ||
        !Array.isArray(pendingBooking?.seats) ||
        pendingBooking.seats.length === 0
      ) {
        localStorage.removeItem("pending_booking");
        return;
      }

      if (
        pendingBooking.orderId &&
        result.orderId &&
        pendingBooking.orderId !== result.orderId
      ) {
        return;
      }

      try {
        setIsConfirming(true);
        if (result.orderId) {
          sessionStorage.setItem(orderLockKey, "processing");
        }
        const confirmResponse = await PaymentService.confirmMomoPayment({
          orderId: pendingBooking.orderId || result.orderId,
          momoResult: momoResultPayload,
        });

        const bookingToken = confirmResponse?.data?.bookingToken;
        if (!bookingToken) {
          throw new Error("Khong nhan duoc booking token tu payment service");
        }

        await ShowtimeService.bookSeats(pendingBooking.showtimeId, {
          bookingToken,
        });

        localStorage.removeItem("pending_booking");
        if (result.orderId) {
          sessionStorage.setItem(orderLockKey, "done");
        }
        setBookingDone(true);
      } catch (error) {
        if (result.orderId) {
          sessionStorage.removeItem(orderLockKey);
        }
        toast.error(error?.message || "Khong the xac nhan dat ve");
      } finally {
        setIsConfirming(false);
      }
    };

    confirmBooking();
  }, [result.isSuccess, result.orderId, momoResultPayload]);

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
          {result.isSuccess && isConfirming ? (
            <p className="text-xs text-primary">
              Dang dong bo ve va cap nhat ghe...
            </p>
          ) : null}
          {result.isSuccess && bookingDone ? (
            <p className="text-xs text-green-400">Da tao ve thanh cong.</p>
          ) : null}
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
