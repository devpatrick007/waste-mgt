// lib/api.js
const BASE_URL = "http://localhost:4000";

/**
 * Generic GET request
 * @param {string} endpoint - API endpoint, e.g., "inventory"
 * @param {object} params - optional query parameters, e.g., { collectorId: "COL001" }
 */
export async function get(endpoint, params = {}) {
    let url = `${BASE_URL}/${endpoint}`;

    // add query params if provided
    const query = new URLSearchParams(params).toString();
    if (query) url += `?${query}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to GET ${endpoint}: ${res.statusText}`);
    }

    return res.json();
}

/**
 * Generic POST request
 * @param {string} endpoint - API endpoint
 * @param {object} body - JSON body to send
 */
export async function post(endpoint, body) {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to POST ${endpoint}`);
    }

    return res.json();
}

/**
 * Generic DELETE request
 * @param {string} endpoint - API endpoint
 */
export async function remove(endpoint) {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Failed to DELETE ${endpoint}`);
    }

    return res.json();
}