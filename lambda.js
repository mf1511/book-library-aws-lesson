import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "booksLibrary";

const getBook = async (id) => {
  const result = await dynamo.send(
    new GetCommand({
      TableName: tableName,
      Key: { id: Number(id) },
    })
  );
  return result.Item || { message: "Book not found" };
};

const getAllBooks = async () => {
  const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
  return result.Items || { message: "No books found" };
};
