import type { ManageVenue, ManageVenuePayload } from "@/api/manage-venues.api";
import { Button } from "@/components/ui/button";
import { TextareaInput, TextInput } from "@/components/ui/input";
import type { TFunction } from "i18next";
import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCloudinarySignature, uploadToCloudinary } from "@/api/upload.api";

const CLOUDINARY_CLOUD_NAME = "dremhy6nr"; // Replace with your Cloudinary cloud name
const CLOUDINARY_API_KEY = "877779214928376"; // Replace with your Cloudinary API key

type VenueFormValues = {
	title: string;
	location: string;
	capacity: string;
	price: string;
	description: string;
	imageUrl: string;
};

type VenueFormErrors = Partial<Record<keyof VenueFormValues, string>>;

type VenueFormProps = {
	clientId: string;
	venue?: ManageVenue | null;
	isSubmitting?: boolean;
	onCancel: () => void;
	onSubmit: (payload: ManageVenuePayload) => void;
};

const UploadIcon = () => (
	<svg
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		aria-hidden="true"
	>
		<path
			d="M12 15V4m0 0 4 4m-4-4L8 8m12 7v3.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V15"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const getInitialValues = (venue?: ManageVenue | null): VenueFormValues => ({
	title: venue?.title ?? "",
	location: venue?.location ?? "",
	capacity: venue?.capacity ? String(venue.capacity) : "",
	price: venue?.price ?? "",
	description: venue?.description ?? "",
	imageUrl: venue?.images?.[0] ?? "",
});

const validateForm = (
	values: VenueFormValues,
	t: TFunction,
): VenueFormErrors => {
	const errors: VenueFormErrors = {};

	if (!values.title.trim()) {
		errors.title = t("manageVenues.validation.titleRequired");
	}

	if (!values.location.trim()) {
		errors.location = t("manageVenues.validation.locationRequired");
	}

	if (!values.capacity.trim()) {
		errors.capacity = t("manageVenues.validation.capacityRequired");
	} else if (
		!Number.isInteger(Number(values.capacity)) ||
		Number(values.capacity) <= 0
	) {
		errors.capacity = t("manageVenues.validation.capacityPositive");
	}

	if (!values.price.trim()) {
		errors.price = t("manageVenues.validation.priceRequired");
	}

	if (!values.description.trim()) {
		errors.description = t("manageVenues.validation.descriptionRequired");
	}

	if (values.imageUrl.trim()) {
		try {
			new URL(values.imageUrl);
		} catch {
			errors.imageUrl = t("manageVenues.validation.imageUrlInvalid");
		}
	}

	return errors;
};

export const VenueForm = ({
	clientId,
	venue,
	isSubmitting,
	onCancel,
	onSubmit,
}: VenueFormProps) => {
	const { t } = useTranslation();
	const [values, setValues] = useState<VenueFormValues>(() =>
		getInitialValues(venue),
	);
	const [errors, setErrors] = useState<VenueFormErrors>({});
	const [isDragging, setIsDragging] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		setValues(getInitialValues(venue));
		setErrors({});
	}, [venue]);

	const setField = (field: keyof VenueFormValues, value: string) => {
		setValues((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({ ...current, [field]: undefined }));
	};

	const handleImageFile = async (file?: File) => {
		if (!file) {
			return;
		}

		setIsUploading(true);
		try {
			const { data: signatureData } = await getCloudinarySignature();
			const uploadData = await uploadToCloudinary(
				file,
				signatureData.signature,
				signatureData.timestamp,
				CLOUDINARY_API_KEY,
				CLOUDINARY_CLOUD_NAME,
			);
			setField("imageUrl", uploadData.secure_url);
		} catch (error) {
			console.error("Upload failed", error);
			setErrors((current) => ({
				...current,
				imageUrl: "Image upload failed. Please try again.",
			}));
		} finally {
			setIsUploading(false);
		}
	};

	const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setIsDragging(false);
		handleImageFile(event.dataTransfer.files?.[0]);
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		handleImageFile(event.target.files?.[0]);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const nextErrors = validateForm(values, t);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		onSubmit({
			clientId,
			title: values.title.trim(),
			location: values.location.trim(),
			capacity: Number(values.capacity),
			price: values.price.trim(),
			description: values.description.trim(),
			images: values.imageUrl.trim() ? [values.imageUrl.trim()] : [],
			availability: [],
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="grid gap-5 md:grid-cols-2">
				<TextInput
					label={t("manageVenues.fields.venueName")}
					value={values.title}
					onChange={(event) => setField("title", event.target.value)}
					error={errors.title}
					placeholder={t("manageVenues.placeholders.venueName")}
				/>
				<TextInput
					label={t("manageVenues.fields.location")}
					value={values.location}
					onChange={(event) =>
						setField("location", event.target.value)
					}
					error={errors.location}
					placeholder={t("manageVenues.placeholders.location")}
				/>
				<TextInput
					label={t("manageVenues.fields.capacity")}
					value={values.capacity}
					onChange={(event) =>
						setField("capacity", event.target.value)
					}
					error={errors.capacity}
					placeholder={t("manageVenues.placeholders.capacity")}
					inputMode="numeric"
				/>
				<TextInput
					label={t("manageVenues.fields.pricePerDay")}
					value={values.price}
					onChange={(event) => setField("price", event.target.value)}
					error={errors.price}
					placeholder={t("manageVenues.placeholders.price")}
					inputMode="decimal"
				/>
			</div>

			<TextareaInput
				label={t("manageVenues.fields.description")}
				value={values.description}
				onChange={(event) =>
					setField("description", event.target.value)
				}
				error={errors.description}
				placeholder={t("manageVenues.placeholders.description")}
			/>

			<div>
				<span className="mb-2 block text-sm font-semibold text-gray-700">
					{t("manageVenues.fields.imageUpload")}
				</span>
				<label
					onDragOver={(event) => {
						event.preventDefault();
						setIsDragging(true);
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={handleDrop}
					className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition ${
						isDragging
							? "border-indigo-500 bg-indigo-50"
							: "border-gray-200 bg-gray-50 hover:bg-gray-100"
					} ${isUploading ? "cursor-wait" : ""}`}
				>
					<input
						type="file"
						accept="image/*"
						className="sr-only"
						onChange={handleFileChange}
						disabled={isUploading}
					/>
					{isUploading ? (
						<span className="font-semibold text-gray-800">
							Uploading...
						</span>
					) : values.imageUrl ? (
						<img
							src={values.imageUrl}
							alt={t("manageVenues.venuePreview")}
							className="h-36 w-full max-w-md rounded-xl object-cover"
						/>
					) : (
						<>
							<span className="text-indigo-600">
								<UploadIcon />
							</span>
							<span className="mt-3 font-semibold text-gray-800">
								{t("manageVenues.dropImage")}
							</span>
							<span className="mt-1 text-sm text-gray-500">
								{t("manageVenues.imageUploadHint")}
							</span>
						</>
					)}
				</label>
				{errors.imageUrl && (
					<span className="mt-1 block text-sm text-red-600">
						{errors.imageUrl}
					</span>
				)}
				<TextInput
					label={t("manageVenues.fields.imageUrl")}
					value={values.imageUrl}
					onChange={(event) =>
						setField("imageUrl", event.target.value)
					}
					error={errors.imageUrl}
					placeholder={t("manageVenues.placeholders.imageUrl")}
					className="mt-2"
				/>
			</div>

			<div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
				<Button
					variant="outline"
					onClick={onCancel}
					disabled={isSubmitting || isUploading}
				>
					{t("manageVenues.cancel")}
				</Button>
				<Button type="submit" disabled={isSubmitting || isUploading}>
					{isSubmitting
						? venue
							? t("manageVenues.saving")
							: t("manageVenues.creating")
						: venue
							? t("manageVenues.saveVenue")
							: t("manageVenues.createVenue")}
				</Button>
			</div>
		</form>
	);
};
