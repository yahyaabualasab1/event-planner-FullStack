import type { ManageVenue, ManageVenuePayload } from "@/api/manage-venues.api";
import { VenueCard } from "@/components/manage-venues/venue-card";
import { VenueForm } from "@/components/manage-venues/venue-form";
import { Button } from "@/components/ui/button";
import {
	useCreateManageVenue,
	useDeleteManageVenue,
	useManageVenues,
	useUpdateManageVenue,
} from "@/hooks/use-manage-venues";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PlusIcon = () => (
	<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M12 5v14m-7-7h14"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

export const ManageVenuesPage = () => {
	const { t } = useTranslation();
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;
	const navigate = useNavigate();
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingVenue, setEditingVenue] = useState<ManageVenue | null>(null);
	const [deletingVenueId, setDeletingVenueId] = useState<string | null>(null);

	const venuesQuery = useManageVenues();
	const createVenue = useCreateManageVenue();
	const updateVenue = useUpdateManageVenue();
	const deleteVenue = useDeleteManageVenue();

	const venues = venuesQuery.data ?? [];
	const isSubmitting = createVenue.isPending || updateVenue.isPending;

	const openCreateForm = () => {
		setEditingVenue(null);
		setIsFormOpen(true);
	};

	const openEditForm = (venue: ManageVenue) => {
		setEditingVenue(venue);
		setIsFormOpen(true);
	};

	const closeForm = () => {
		setIsFormOpen(false);
		setEditingVenue(null);
	};

	const handleSubmit = (payload: ManageVenuePayload) => {
		if (editingVenue) {
			const { clientId: _clientId, ...updatePayload } = payload;
			void _clientId;
			updateVenue.mutate(
				{ id: editingVenue._id, data: updatePayload },
				{ onSuccess: closeForm },
			);
			return;
		}

		createVenue.mutate(payload, { onSuccess: closeForm });
	};

	const handleDelete = (venue: ManageVenue) => {
		const confirmed = window.confirm(
			t("manageVenues.confirmDelete", { title: venue.title }),
		);
		if (!confirmed) {
			return;
		}

		setDeletingVenueId(venue._id);
		deleteVenue.mutate(venue._id, {
			onSettled: () => setDeletingVenueId(null),
		});
	};

	const handleBookingsClick = (venue: ManageVenue) => {
		navigate(`/dashboard/bookings?venueId=${venue._id}`);
	};

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h2 className="text-3xl font-bold text-gray-950">
						{t("manageVenues.title")}
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						{t("manageVenues.subtitle")}
					</p>
				</div>
				<Button
					onClick={openCreateForm}
					icon={<PlusIcon />}
					className="h-16 rounded-xl px-8 text-lg"
				>
					{t("manageVenues.addNewVenue")}
				</Button>
			</div>

			{isFormOpen && clientId && (
				<section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<div className="mb-6">
						<h3 className="text-2xl font-bold text-gray-950">
							{editingVenue
								? t("manageVenues.editVenue")
								: t("manageVenues.addNewVenue")}
						</h3>
						<p className="mt-2 text-gray-600">
							{editingVenue
								? t("manageVenues.editDescription")
								: t("manageVenues.createDescription")}
						</p>
					</div>
					<VenueForm
						clientId={clientId}
						venue={editingVenue}
						isSubmitting={isSubmitting}
						onCancel={closeForm}
						onSubmit={handleSubmit}
					/>
				</section>
			)}

			{!clientId && (
				<div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
					{t("manageVenues.sessionLoading")}
				</div>
			)}

			{venuesQuery.isLoading && (
				<div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-600">
					{t("manageVenues.loading")}
				</div>
			)}

			{venuesQuery.isError && (
				<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
					{t("manageVenues.loadError")}
				</div>
			)}

			{!venuesQuery.isLoading && !venuesQuery.isError && venues.length === 0 && (
				<div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
					<h3 className="text-xl font-bold text-gray-950">
						{t("manageVenues.emptyTitle")}
					</h3>
					<p className="mt-2 text-gray-600">
						{t("manageVenues.emptyDescription")}
					</p>
					<Button onClick={openCreateForm} icon={<PlusIcon />} className="mt-6">
						{t("manageVenues.addNewVenue")}
					</Button>
				</div>
			)}

			{venues.length > 0 && (
				<div className="grid gap-7 xl:grid-cols-3 lg:grid-cols-2">
					{venues.map((venue) => (
						<VenueCard
							key={venue._id}
							venue={venue}
							onEdit={openEditForm}
							onDelete={handleDelete}
							onBookingsClick={handleBookingsClick}
							isDeleting={deletingVenueId === venue._id}
						/>
					))}
				</div>
			)}
		</div>
	);
};
