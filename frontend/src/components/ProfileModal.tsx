// app/profile/add-link/page.tsx
"use client";

import React, { useState } from 'react';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddLinkPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleApply = () => {
    // TODO: submit to your API or Redux store
    console.log({ url, title, description });
    // then navigate back to profile overview
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1"
          >
            <X size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Add a link
          </h1>
          <div className="w-6" /> {/* placeholder for centering */}
        </div>

        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Paste or type a link to an article, file or video
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title*
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Add a description"
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Thumbnail & Preview */}
          {url && (
            <div className="flex items-center space-x-4">
              <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <Image
                  src={`/api/thumbnail?url=${encodeURIComponent(url)}`}
                  alt="Thumbnail"
                  width={128}
                  height={80}
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => window.open(url, "_blank")}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Preview link
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!url || !title}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
