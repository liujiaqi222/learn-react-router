import { Outlet, useLoaderData, Form, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contact";
import { useEffect, useState } from "react";

/* 
Without client side routing, the browser will serialize the form's data automatically and
send it to the server as the request body for POST, and as URLSearchParams for GET.
React Router does the same thing, except instead of sending the request to the server,
it uses client side routing and sends it to a route action.
*/

export async function action() {
  await createContact();
  return null;
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const submit = useSubmit();

  const navigation = useNavigation();
  // It then goes away when there is no pending navigation anymore.
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
  console.log(searching);
  function handleInputChange(event) {
    const isFirstSearch = q == null;

    setQuery(event.target.value);
    submit(event.target.form, {
      replace: !isFirstSearch,
    });
  }

  useEffect(() => {
    setQuery(q);
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? "loading" : ""}
              value={query}
              onChange={(e) => handleInputChange(e)}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      {/* "idle" | "submitting" | "loading" */}
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return { contacts, q };
}
