import { AlertTriangle, CheckCircle2, Eye, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Modal } from "@/components/modal";
import type { VenueStatusValue } from "@/api/venues.api";
import { useUpdateVenueStatus, useVenues } from "@/hooks/use-venues";

type ListingStatus = VenueStatusValue;

interface Venue {
  _id: string;
  clientId: string | { _id?: string; fullName?: string; name?: string };
  title: string;
  description: string;
  location: string;
  price: string;
  images: string[];
  extras: string;
  availability: { date?: string | Date; from: string; to: string }[];
  discounts?: string;
  isDeleted: boolean;
  status?: string;
  bookingsCount?: number;
  bookings?: number;
  rating?: number | string;
  averageRating?: number | string;
}

const normalizeStatus = (venue: Venue, override?: ListingStatus) => {
  if (override) return override;
  const raw = venue.status?.toLowerCase();
  if (raw === "approved" || raw === "pending" || raw === "flagged") {
    return raw;
  }
  if (venue.isDeleted) return "flagged";
  return "pending";
};

const statusMeta = (status: ListingStatus) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700",
      };
    case "flagged":
      return {
        label: "Flagged",
        icon: XCircle,
        className: "bg-red-100 text-red-600",
      };
    case "pending":
    default:
      return {
        label: "Pending",
        icon: AlertTriangle,
        className: "bg-yellow-100 text-yellow-700",
      };
  }
};

const VenueCard = ({
  venue,
  isUpdating,
  updateError,
  onViewDetails,
  onStatusChange,
}: {
  venue: Venue;
  isUpdating: boolean;
  updateError: boolean;
  onViewDetails: (venue: Venue) => void;
  onStatusChange: (id: string, status: ListingStatus) => void;
}) => {
  const { t } = useTranslation();
  const status = normalizeStatus(venue);
  const meta = statusMeta(status);
  const StatusIcon = meta.icon;
  const imageUrl = venue.images?.[0];
  const bookingsCount = venue.bookingsCount ?? venue.bookings ?? 0;
  const rating = venue.averageRating ?? venue.rating ?? t("common.notAvailable");
  const ownerName = () => {
    if (!venue.clientId) return t("common.unknown");
    if (typeof venue.clientId === "string") return venue.clientId;
    return (
      venue.clientId.fullName ||
      venue.clientId.name ||
      venue.clientId._id ||
      t("common.unknown")
    );
  };

  const stats = [
    { label: "Price", value: venue.price || t("common.notAvailable") },
    { label: "Bookings", value: bookingsCount },
    { label: "Rating", value: rating },
    { label: "Status", value: meta.label },
  ];

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/70">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 xl:h-40 xl:w-40">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={venue.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              {t("venuesPage.card.noImage")}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h3 className="text-2xl font-semibold leading-tight text-black">
                {venue.title}
              </h3>
              <p className="mt-2 text-base leading-5 text-slate-700">
                Owner: {ownerName()}
              </p>
              <p className="text-base leading-5 text-slate-700">
                {venue.location || t("common.notAvailable")}
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-xl px-4 py-3 text-lg font-semibold ${meta.className}`}
            >
              <StatusIcon size={20} />
              {meta.label}
            </span>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 px-4 py-4">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold leading-none text-black">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onViewDetails(venue)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <Eye size={18} />
              View Details
            </button>

            {status === "pending" && (
              <>
                <button
                  type="button"
                  onClick={() => onStatusChange(venue._id, "approved")}
                  disabled={isUpdating}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-base font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckCircle2 size={20} />
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange(venue._id, "flagged")}
                  disabled={isUpdating}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <XCircle size={19} />
                  Reject
                </button>
              </>
            )}
          </div>

          {updateError && (
            <p className="mt-3 text-sm font-medium text-red-600">
              Failed to update listing status.
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

const VenueDetailsModal = ({
  venue,
  onClose,
}: {
  venue: Venue | null;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const status = venue ? normalizeStatus(venue) : "pending";
  const meta = statusMeta(status);
  const StatusIcon = meta.icon;

  if (!venue) return null;

  const owner =
    typeof venue.clientId === "string"
      ? venue.clientId
      : venue.clientId?.fullName ||
        venue.clientId?.name ||
        venue.clientId?._id ||
        t("common.unknown");

  const details = [
    { label: "Owner", value: owner },
    { label: "Location", value: venue.location || t("common.notAvailable") },
    { label: "Price", value: venue.price || t("common.notAvailable") },
    { label: "Rating", value: venue.averageRating ?? venue.rating ?? t("common.notAvailable") },
    { label: "Bookings", value: venue.bookingsCount ?? venue.bookings ?? 0 },
    { label: "Extras", value: venue.extras || t("common.notAvailable") },
    { label: "Discounts", value: venue.discounts || t("common.notAvailable") },
  ];

  return (
    <Modal
      open={Boolean(venue)}
      onClose={onClose}
      title={venue.title}
      description={venue.description || venue.location}
      icon={<Eye size={22} />}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {venue.images?.[0] && (
          <div className="h-56 overflow-hidden rounded-xl bg-gray-100">
            <img
              src={venue.images[0]}
              alt={venue.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <span
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${meta.className}`}
        >
          <StatusIcon size={18} />
          {meta.label}
        </span>

        <div className="grid gap-3 sm:grid-cols-2">
          {details.map((item) => (
            <div key={item.label} className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export const ListingsPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("clientId") ?? searchParams.get("personId");
  const { data, isLoading, isError } = useVenues();
  const updateStatus = useUpdateVenueStatus();
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const venues = useMemo(() => {
    const items = (data ?? []) as Venue[];
    if (!clientId) return items;
    return items.filter((venue) => {
      const venueClientId =
        typeof venue.clientId === "string"
          ? venue.clientId
          : venue.clientId?._id;
      return venueClientId === clientId;
    });
  }, [clientId, data]);

  const handleStatusChange = (id: string, status: ListingStatus) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">
          {t("listingsPage.title")}
        </h2>
        <p className="text-sm text-gray-500">
          {clientId
            ? t("listingsPage.subtitle", { clientId })
            : t("listingsPage.subtitle")}
        </p>
      </header>

      <div className="space-y-5">
        {isLoading && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">{t("venuesPage.loading")}</p>
          </div>
        )}

        {isError && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-red-500">{t("venuesPage.loadError")}</p>
          </div>
        )}

        {!isLoading && !isError && venues.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-sm text-gray-500">
            {clientId
              ? t("listingsPage.emptyForClient", { clientId })
              : t("venuesPage.empty")}
          </div>
        )}

        {!isLoading &&
          !isError &&
          venues.map((venue) => (
            <VenueCard
              key={venue._id}
              venue={venue}
              isUpdating={
                updateStatus.isPending && updateStatus.variables?.id === venue._id
              }
              updateError={
                updateStatus.isError && updateStatus.variables?.id === venue._id
              }
              onViewDetails={setSelectedVenue}
              onStatusChange={handleStatusChange}
            />
          ))}
      </div>

      <VenueDetailsModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />
    </div>
  );
};
