import GetPage from "../components/getPage";
export default function GetPageRoute({ params }: { params: { slug: string } }) {
  if (typeof params.slug !== "string") {
    return <div>Invalid ID</div>;
  } else {
    return <GetPage clippyId={params.slug} />;
  }
}
