import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contact";

/* These params are passed to the loader with keys that match the dynamic segment. 
For example, our segment is named :contactId so the value will be passed as params.contactId. */

export async function loader({ params }) {
  return getContact(params.contactId);
}

export default function contact() {
  const contact = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img src={contact.avatar || null} alt="" />
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
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? false : true}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
