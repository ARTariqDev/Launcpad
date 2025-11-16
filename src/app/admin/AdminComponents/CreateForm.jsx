"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

export default function CreateForm() {
  const [formData, setFormData] = useState({
    type: "university",
    name: "",
    deadline: "",
    description: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, thumbnail: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create:", formData);
  };

  const getDateLabel = () => {
    if (formData.type === "extracurricular") return "Date";
    return "Deadline";
  };

  return (
    <div className="max-w-full sm:max-w-3xl">
      <div className="mb-8">
        <h2
          className="font-bold mb-2"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(24px, 4vw, 32px)",
            fontFamily: "var(--font-display)",
          }}
        >
          Create New Entry
        </h2>
        <p style={{ color: "var(--text-subtle)", fontSize: "14px", fontFamily: "var(--font-body)" }}>
          Add a new university, extracurricular, or scholarship to the platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 sm:p-6 rounded-lg border-2" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="type"
                className="block mb-3 font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  fontFamily: "var(--font-display)",
                }}
              >
                Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border-2 bg-transparent focus:outline-none focus:border-white transition-colors cursor-pointer"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <option value="university" style={{ backgroundColor: "var(--primary-bg)" }}>
                  University/College
                </option>
                <option value="extracurricular" style={{ backgroundColor: "var(--primary-bg)" }}>
                  Extracurricular
                </option>
                <option value="scholarship" style={{ backgroundColor: "var(--primary-bg)" }}>
                  Scholarship
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="block mb-3 font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  fontFamily: "var(--font-display)",
                }}
              >
                {getDateLabel()} *
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border-2 bg-transparent focus:outline-none focus:border-white transition-colors"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-3 font-bold"
            style={{
              color: "var(--text-primary)",
              fontSize: "14px",
              fontFamily: "var(--font-display)",
            }}
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={`Enter ${formData.type} name`}
            className="w-full px-4 py-3 rounded-md border-2 bg-transparent focus:outline-none focus:border-white transition-colors"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-3 font-bold"
            style={{
              color: "var(--text-primary)",
              fontSize: "14px",
              fontFamily: "var(--font-display)",
            }}
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Enter a detailed description..."
            className="w-full px-4 py-3 rounded-md border-2 bg-transparent focus:outline-none focus:border-white transition-colors resize-y"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              minHeight: "120px",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="thumbnail"
            className="block mb-3 font-bold"
            style={{
              color: "var(--text-primary)",
              fontSize: "14px",
              fontFamily: "var(--font-display)",
            }}
          >
            Thumbnail
          </label>
          <div
            className="w-full px-4 py-8 sm:py-12 rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-white transition-all"
            style={{ 
              borderColor: formData.thumbnail ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)",
              backgroundColor: formData.thumbnail ? "rgba(255, 255, 255, 0.03)" : "transparent"
            }}
            onClick={() => document.getElementById("thumbnail").click()}
          >
            <FontAwesomeIcon
              icon={faUpload}
              className="mb-3"
              style={{ color: formData.thumbnail ? "var(--text-secondary)" : "var(--text-subtle)", fontSize: "28px" }}
            />
            <p className="text-center px-2 font-medium" style={{ color: formData.thumbnail ? "var(--text-secondary)" : "var(--text-subtle)", fontSize: "14px", fontFamily: "var(--font-display)" }}>
              {formData.thumbnail ? formData.thumbnail.name : "Click to upload image"}
            </p>
            {!formData.thumbnail && (
              <p className="text-center px-2 mt-1" style={{ color: "var(--text-subtle)", fontSize: "12px" }}>
                Optional
              </p>
            )}
          </div>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="pt-6 flex gap-4">
          <div className="flex-1">
            <Button
              text="Create Entry"
              color="#ffffff"
              textColor="#000000"
              glowColor="#000000"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
