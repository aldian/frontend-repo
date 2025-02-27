const handler = async (req, res) => {
  const { method, query, body } = req;

  const params = new URLSearchParams();
  if (query.id) params.append("id", query.id);
  if (query.limit) params.append("limit", query.limit);

  try {
    let response;

    if (method === 'GET') {
      response = await fetch(`${process.env.USERS_API_BASE_URL}/fetch-user-data?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${process.env.USERS_API_TOKEN}`,
        },
      });
    } else if (method === 'POST') {
      const postData = JSON.parse(body);
      response = await fetch(`${process.env.USERS_API_BASE_URL}/update-user-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.USERS_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
    } else {
      // Handle unsupported methods
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    if (!response.ok) {
      res.writeHead(response.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch data' }));
      return;
    }

    const data = await response.json();
    const responseData = method === 'GET' && !Array.isArray(data) ? [data] : data;
    res.writeHead(response.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

async function fetchUsers() {
  const response = await fetch(`${process.env.USERS_API_BASE_URL}/fetch-user-data`, {
    headers: {
      'Authorization': `Bearer ${process.env.USERS_API_TOKEN}`,
    },
  });
  return await response.json();
}

module.exports = {
  handler,
  fetchUsers,
};