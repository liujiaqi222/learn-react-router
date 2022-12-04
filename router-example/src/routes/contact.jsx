import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contact";

/* These params are passed to the loader with keys that match the dynamic segment. 
For example, our segment is named :contactId so the value will be passed as params.contactId. */

export async function loader({ params }) {
  const contact = await  getContact(params.contactId);
  console.log(contact)
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return contact;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function contact() {
  const contact = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img src={contact?.avatar || null} alt="" />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}
      </div>

      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm("Please confirm you want to delete this record.")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  //  Since it's got method="post" it will call the action.
  //  Since there is no <fetcher.Form action="..."> prop, it will post to the route where the form is rendered
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? false : true}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
