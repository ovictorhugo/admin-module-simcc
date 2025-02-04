import { Separator } from "../../ui/separator";
interface Props {
    keepoD
}
export function SectionBuilderPage(props:Props) {
    return(
        <div className="flex flex-col gap-8">
{keepoData.content.map((contentItem, index) => (
        <div key={index} className="border p-4 rounded-md">
          {(() => {
            switch (contentItem.type) {
              case "divider":
                return <Separator className=""/>;
              case "h1":
                return <h1 className="text-2xl font-bold">{contentItem.title}</h1>;
              case "h2":
                return <h2 className="text-xl font-semibold">{contentItem.title}</h2>;
              case "h3":
                return <h3 className="text-lg font-medium">{contentItem.title}</h3>;
              case "text":
                return <p>{contentItem.title}</p>;
              case "list":
                return <ul className="list-disc pl-5"><li>{contentItem.title}</li></ul>;
              case "video":
                return <video controls src={contentItem.url} className="w-full" />;
              case "image":
                return <img src={contentItem.url} alt={contentItem.title} className="w-full rounded-md" />;
              default:
                return <span>Elemento não reconhecido</span>;
            }
          })()}
        </div>
      ))}
        </div>
    )
}