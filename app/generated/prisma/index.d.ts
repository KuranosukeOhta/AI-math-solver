
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TokenUsageLog
 * 
 */
export type TokenUsageLog = $Result.DefaultSelection<Prisma.$TokenUsageLogPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model MessageImage
 * 
 */
export type MessageImage = $Result.DefaultSelection<Prisma.$MessageImagePayload>
/**
 * Model SharedConversation
 * 
 */
export type SharedConversation = $Result.DefaultSelection<Prisma.$SharedConversationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenUsageLog`: Exposes CRUD operations for the **TokenUsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenUsageLogs
    * const tokenUsageLogs = await prisma.tokenUsageLog.findMany()
    * ```
    */
  get tokenUsageLog(): Prisma.TokenUsageLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageImage`: Exposes CRUD operations for the **MessageImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageImages
    * const messageImages = await prisma.messageImage.findMany()
    * ```
    */
  get messageImage(): Prisma.MessageImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sharedConversation`: Exposes CRUD operations for the **SharedConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SharedConversations
    * const sharedConversations = await prisma.sharedConversation.findMany()
    * ```
    */
  get sharedConversation(): Prisma.SharedConversationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    TokenUsageLog: 'TokenUsageLog',
    Conversation: 'Conversation',
    Message: 'Message',
    MessageImage: 'MessageImage',
    SharedConversation: 'SharedConversation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "tokenUsageLog" | "conversation" | "message" | "messageImage" | "sharedConversation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TokenUsageLog: {
        payload: Prisma.$TokenUsageLogPayload<ExtArgs>
        fields: Prisma.TokenUsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenUsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenUsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>
          }
          findFirst: {
            args: Prisma.TokenUsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenUsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>
          }
          findMany: {
            args: Prisma.TokenUsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>[]
          }
          create: {
            args: Prisma.TokenUsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>
          }
          createMany: {
            args: Prisma.TokenUsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenUsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>[]
          }
          delete: {
            args: Prisma.TokenUsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>
          }
          update: {
            args: Prisma.TokenUsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>
          }
          deleteMany: {
            args: Prisma.TokenUsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUsageLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>[]
          }
          upsert: {
            args: Prisma.TokenUsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenUsageLogPayload>
          }
          aggregate: {
            args: Prisma.TokenUsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenUsageLog>
          }
          groupBy: {
            args: Prisma.TokenUsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenUsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenUsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<TokenUsageLogCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      MessageImage: {
        payload: Prisma.$MessageImagePayload<ExtArgs>
        fields: Prisma.MessageImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>
          }
          findFirst: {
            args: Prisma.MessageImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>
          }
          findMany: {
            args: Prisma.MessageImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>[]
          }
          create: {
            args: Prisma.MessageImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>
          }
          createMany: {
            args: Prisma.MessageImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>[]
          }
          delete: {
            args: Prisma.MessageImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>
          }
          update: {
            args: Prisma.MessageImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>
          }
          deleteMany: {
            args: Prisma.MessageImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>[]
          }
          upsert: {
            args: Prisma.MessageImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageImagePayload>
          }
          aggregate: {
            args: Prisma.MessageImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageImage>
          }
          groupBy: {
            args: Prisma.MessageImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageImageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageImageCountAggregateOutputType> | number
          }
        }
      }
      SharedConversation: {
        payload: Prisma.$SharedConversationPayload<ExtArgs>
        fields: Prisma.SharedConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SharedConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SharedConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>
          }
          findFirst: {
            args: Prisma.SharedConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SharedConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>
          }
          findMany: {
            args: Prisma.SharedConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>[]
          }
          create: {
            args: Prisma.SharedConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>
          }
          createMany: {
            args: Prisma.SharedConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SharedConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>[]
          }
          delete: {
            args: Prisma.SharedConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>
          }
          update: {
            args: Prisma.SharedConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>
          }
          deleteMany: {
            args: Prisma.SharedConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SharedConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SharedConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>[]
          }
          upsert: {
            args: Prisma.SharedConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharedConversationPayload>
          }
          aggregate: {
            args: Prisma.SharedConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSharedConversation>
          }
          groupBy: {
            args: Prisma.SharedConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SharedConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SharedConversationCountArgs<ExtArgs>
            result: $Utils.Optional<SharedConversationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    tokenUsageLog?: TokenUsageLogOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    messageImage?: MessageImageOmit
    sharedConversation?: SharedConversationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    token_usage_logs: number
    conversations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token_usage_logs?: boolean | UserCountOutputTypeCountToken_usage_logsArgs
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountToken_usage_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenUsageLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    shared_conversations: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    shared_conversations?: boolean | ConversationCountOutputTypeCountShared_conversationsArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountShared_conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SharedConversationWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    images: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | MessageCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    token_usage: number | null
    estimated_cost: number | null
  }

  export type UserSumAggregateOutputType = {
    token_usage: number | null
    estimated_cost: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    student_id: string | null
    token_usage: number | null
    estimated_cost: number | null
    created_at: Date | null
    updated_at: Date | null
    google_id: string | null
    profile_image: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    student_id: string | null
    token_usage: number | null
    estimated_cost: number | null
    created_at: Date | null
    updated_at: Date | null
    google_id: string | null
    profile_image: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    student_id: number
    token_usage: number
    estimated_cost: number
    created_at: number
    updated_at: number
    google_id: number
    profile_image: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    token_usage?: true
    estimated_cost?: true
  }

  export type UserSumAggregateInputType = {
    token_usage?: true
    estimated_cost?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    student_id?: true
    token_usage?: true
    estimated_cost?: true
    created_at?: true
    updated_at?: true
    google_id?: true
    profile_image?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    student_id?: true
    token_usage?: true
    estimated_cost?: true
    created_at?: true
    updated_at?: true
    google_id?: true
    profile_image?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    student_id?: true
    token_usage?: true
    estimated_cost?: true
    created_at?: true
    updated_at?: true
    google_id?: true
    profile_image?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    student_id: string | null
    token_usage: number
    estimated_cost: number
    created_at: Date
    updated_at: Date
    google_id: string | null
    profile_image: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    student_id?: boolean
    token_usage?: boolean
    estimated_cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    google_id?: boolean
    profile_image?: boolean
    token_usage_logs?: boolean | User$token_usage_logsArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    student_id?: boolean
    token_usage?: boolean
    estimated_cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    google_id?: boolean
    profile_image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    student_id?: boolean
    token_usage?: boolean
    estimated_cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    google_id?: boolean
    profile_image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    student_id?: boolean
    token_usage?: boolean
    estimated_cost?: boolean
    created_at?: boolean
    updated_at?: boolean
    google_id?: boolean
    profile_image?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "student_id" | "token_usage" | "estimated_cost" | "created_at" | "updated_at" | "google_id" | "profile_image", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token_usage_logs?: boolean | User$token_usage_logsArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      token_usage_logs: Prisma.$TokenUsageLogPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      student_id: string | null
      token_usage: number
      estimated_cost: number
      created_at: Date
      updated_at: Date
      google_id: string | null
      profile_image: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token_usage_logs<T extends User$token_usage_logsArgs<ExtArgs> = {}>(args?: Subset<T, User$token_usage_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly student_id: FieldRef<"User", 'String'>
    readonly token_usage: FieldRef<"User", 'Int'>
    readonly estimated_cost: FieldRef<"User", 'Float'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly google_id: FieldRef<"User", 'String'>
    readonly profile_image: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.token_usage_logs
   */
  export type User$token_usage_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    where?: TokenUsageLogWhereInput
    orderBy?: TokenUsageLogOrderByWithRelationInput | TokenUsageLogOrderByWithRelationInput[]
    cursor?: TokenUsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenUsageLogScalarFieldEnum | TokenUsageLogScalarFieldEnum[]
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TokenUsageLog
   */

  export type AggregateTokenUsageLog = {
    _count: TokenUsageLogCountAggregateOutputType | null
    _avg: TokenUsageLogAvgAggregateOutputType | null
    _sum: TokenUsageLogSumAggregateOutputType | null
    _min: TokenUsageLogMinAggregateOutputType | null
    _max: TokenUsageLogMaxAggregateOutputType | null
  }

  export type TokenUsageLogAvgAggregateOutputType = {
    input_tokens: number | null
    output_tokens: number | null
    total_tokens: number | null
    cost: number | null
  }

  export type TokenUsageLogSumAggregateOutputType = {
    input_tokens: number | null
    output_tokens: number | null
    total_tokens: number | null
    cost: number | null
  }

  export type TokenUsageLogMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    input_tokens: number | null
    output_tokens: number | null
    total_tokens: number | null
    model_name: string | null
    cost: number | null
    conversation_id: string | null
    created_at: Date | null
  }

  export type TokenUsageLogMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    input_tokens: number | null
    output_tokens: number | null
    total_tokens: number | null
    model_name: string | null
    cost: number | null
    conversation_id: string | null
    created_at: Date | null
  }

  export type TokenUsageLogCountAggregateOutputType = {
    id: number
    user_id: number
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: number
    cost: number
    conversation_id: number
    created_at: number
    _all: number
  }


  export type TokenUsageLogAvgAggregateInputType = {
    input_tokens?: true
    output_tokens?: true
    total_tokens?: true
    cost?: true
  }

  export type TokenUsageLogSumAggregateInputType = {
    input_tokens?: true
    output_tokens?: true
    total_tokens?: true
    cost?: true
  }

  export type TokenUsageLogMinAggregateInputType = {
    id?: true
    user_id?: true
    input_tokens?: true
    output_tokens?: true
    total_tokens?: true
    model_name?: true
    cost?: true
    conversation_id?: true
    created_at?: true
  }

  export type TokenUsageLogMaxAggregateInputType = {
    id?: true
    user_id?: true
    input_tokens?: true
    output_tokens?: true
    total_tokens?: true
    model_name?: true
    cost?: true
    conversation_id?: true
    created_at?: true
  }

  export type TokenUsageLogCountAggregateInputType = {
    id?: true
    user_id?: true
    input_tokens?: true
    output_tokens?: true
    total_tokens?: true
    model_name?: true
    cost?: true
    conversation_id?: true
    created_at?: true
    _all?: true
  }

  export type TokenUsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenUsageLog to aggregate.
     */
    where?: TokenUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenUsageLogs to fetch.
     */
    orderBy?: TokenUsageLogOrderByWithRelationInput | TokenUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenUsageLogs
    **/
    _count?: true | TokenUsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenUsageLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenUsageLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenUsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenUsageLogMaxAggregateInputType
  }

  export type GetTokenUsageLogAggregateType<T extends TokenUsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenUsageLog[P]>
      : GetScalarType<T[P], AggregateTokenUsageLog[P]>
  }




  export type TokenUsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenUsageLogWhereInput
    orderBy?: TokenUsageLogOrderByWithAggregationInput | TokenUsageLogOrderByWithAggregationInput[]
    by: TokenUsageLogScalarFieldEnum[] | TokenUsageLogScalarFieldEnum
    having?: TokenUsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenUsageLogCountAggregateInputType | true
    _avg?: TokenUsageLogAvgAggregateInputType
    _sum?: TokenUsageLogSumAggregateInputType
    _min?: TokenUsageLogMinAggregateInputType
    _max?: TokenUsageLogMaxAggregateInputType
  }

  export type TokenUsageLogGroupByOutputType = {
    id: string
    user_id: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id: string | null
    created_at: Date
    _count: TokenUsageLogCountAggregateOutputType | null
    _avg: TokenUsageLogAvgAggregateOutputType | null
    _sum: TokenUsageLogSumAggregateOutputType | null
    _min: TokenUsageLogMinAggregateOutputType | null
    _max: TokenUsageLogMaxAggregateOutputType | null
  }

  type GetTokenUsageLogGroupByPayload<T extends TokenUsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenUsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenUsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenUsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], TokenUsageLogGroupByOutputType[P]>
        }
      >
    >


  export type TokenUsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    input_tokens?: boolean
    output_tokens?: boolean
    total_tokens?: boolean
    model_name?: boolean
    cost?: boolean
    conversation_id?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenUsageLog"]>

  export type TokenUsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    input_tokens?: boolean
    output_tokens?: boolean
    total_tokens?: boolean
    model_name?: boolean
    cost?: boolean
    conversation_id?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenUsageLog"]>

  export type TokenUsageLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    input_tokens?: boolean
    output_tokens?: boolean
    total_tokens?: boolean
    model_name?: boolean
    cost?: boolean
    conversation_id?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenUsageLog"]>

  export type TokenUsageLogSelectScalar = {
    id?: boolean
    user_id?: boolean
    input_tokens?: boolean
    output_tokens?: boolean
    total_tokens?: boolean
    model_name?: boolean
    cost?: boolean
    conversation_id?: boolean
    created_at?: boolean
  }

  export type TokenUsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "input_tokens" | "output_tokens" | "total_tokens" | "model_name" | "cost" | "conversation_id" | "created_at", ExtArgs["result"]["tokenUsageLog"]>
  export type TokenUsageLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenUsageLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenUsageLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TokenUsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenUsageLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      input_tokens: number
      output_tokens: number
      total_tokens: number
      model_name: string
      cost: number
      conversation_id: string | null
      created_at: Date
    }, ExtArgs["result"]["tokenUsageLog"]>
    composites: {}
  }

  type TokenUsageLogGetPayload<S extends boolean | null | undefined | TokenUsageLogDefaultArgs> = $Result.GetResult<Prisma.$TokenUsageLogPayload, S>

  type TokenUsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenUsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenUsageLogCountAggregateInputType | true
    }

  export interface TokenUsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenUsageLog'], meta: { name: 'TokenUsageLog' } }
    /**
     * Find zero or one TokenUsageLog that matches the filter.
     * @param {TokenUsageLogFindUniqueArgs} args - Arguments to find a TokenUsageLog
     * @example
     * // Get one TokenUsageLog
     * const tokenUsageLog = await prisma.tokenUsageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenUsageLogFindUniqueArgs>(args: SelectSubset<T, TokenUsageLogFindUniqueArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenUsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenUsageLogFindUniqueOrThrowArgs} args - Arguments to find a TokenUsageLog
     * @example
     * // Get one TokenUsageLog
     * const tokenUsageLog = await prisma.tokenUsageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenUsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenUsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenUsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogFindFirstArgs} args - Arguments to find a TokenUsageLog
     * @example
     * // Get one TokenUsageLog
     * const tokenUsageLog = await prisma.tokenUsageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenUsageLogFindFirstArgs>(args?: SelectSubset<T, TokenUsageLogFindFirstArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenUsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogFindFirstOrThrowArgs} args - Arguments to find a TokenUsageLog
     * @example
     * // Get one TokenUsageLog
     * const tokenUsageLog = await prisma.tokenUsageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenUsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenUsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenUsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenUsageLogs
     * const tokenUsageLogs = await prisma.tokenUsageLog.findMany()
     * 
     * // Get first 10 TokenUsageLogs
     * const tokenUsageLogs = await prisma.tokenUsageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenUsageLogWithIdOnly = await prisma.tokenUsageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenUsageLogFindManyArgs>(args?: SelectSubset<T, TokenUsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenUsageLog.
     * @param {TokenUsageLogCreateArgs} args - Arguments to create a TokenUsageLog.
     * @example
     * // Create one TokenUsageLog
     * const TokenUsageLog = await prisma.tokenUsageLog.create({
     *   data: {
     *     // ... data to create a TokenUsageLog
     *   }
     * })
     * 
     */
    create<T extends TokenUsageLogCreateArgs>(args: SelectSubset<T, TokenUsageLogCreateArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenUsageLogs.
     * @param {TokenUsageLogCreateManyArgs} args - Arguments to create many TokenUsageLogs.
     * @example
     * // Create many TokenUsageLogs
     * const tokenUsageLog = await prisma.tokenUsageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenUsageLogCreateManyArgs>(args?: SelectSubset<T, TokenUsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenUsageLogs and returns the data saved in the database.
     * @param {TokenUsageLogCreateManyAndReturnArgs} args - Arguments to create many TokenUsageLogs.
     * @example
     * // Create many TokenUsageLogs
     * const tokenUsageLog = await prisma.tokenUsageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenUsageLogs and only return the `id`
     * const tokenUsageLogWithIdOnly = await prisma.tokenUsageLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenUsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenUsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TokenUsageLog.
     * @param {TokenUsageLogDeleteArgs} args - Arguments to delete one TokenUsageLog.
     * @example
     * // Delete one TokenUsageLog
     * const TokenUsageLog = await prisma.tokenUsageLog.delete({
     *   where: {
     *     // ... filter to delete one TokenUsageLog
     *   }
     * })
     * 
     */
    delete<T extends TokenUsageLogDeleteArgs>(args: SelectSubset<T, TokenUsageLogDeleteArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenUsageLog.
     * @param {TokenUsageLogUpdateArgs} args - Arguments to update one TokenUsageLog.
     * @example
     * // Update one TokenUsageLog
     * const tokenUsageLog = await prisma.tokenUsageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUsageLogUpdateArgs>(args: SelectSubset<T, TokenUsageLogUpdateArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenUsageLogs.
     * @param {TokenUsageLogDeleteManyArgs} args - Arguments to filter TokenUsageLogs to delete.
     * @example
     * // Delete a few TokenUsageLogs
     * const { count } = await prisma.tokenUsageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenUsageLogDeleteManyArgs>(args?: SelectSubset<T, TokenUsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenUsageLogs
     * const tokenUsageLog = await prisma.tokenUsageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUsageLogUpdateManyArgs>(args: SelectSubset<T, TokenUsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenUsageLogs and returns the data updated in the database.
     * @param {TokenUsageLogUpdateManyAndReturnArgs} args - Arguments to update many TokenUsageLogs.
     * @example
     * // Update many TokenUsageLogs
     * const tokenUsageLog = await prisma.tokenUsageLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TokenUsageLogs and only return the `id`
     * const tokenUsageLogWithIdOnly = await prisma.tokenUsageLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUsageLogUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUsageLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TokenUsageLog.
     * @param {TokenUsageLogUpsertArgs} args - Arguments to update or create a TokenUsageLog.
     * @example
     * // Update or create a TokenUsageLog
     * const tokenUsageLog = await prisma.tokenUsageLog.upsert({
     *   create: {
     *     // ... data to create a TokenUsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenUsageLog we want to update
     *   }
     * })
     */
    upsert<T extends TokenUsageLogUpsertArgs>(args: SelectSubset<T, TokenUsageLogUpsertArgs<ExtArgs>>): Prisma__TokenUsageLogClient<$Result.GetResult<Prisma.$TokenUsageLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogCountArgs} args - Arguments to filter TokenUsageLogs to count.
     * @example
     * // Count the number of TokenUsageLogs
     * const count = await prisma.tokenUsageLog.count({
     *   where: {
     *     // ... the filter for the TokenUsageLogs we want to count
     *   }
     * })
    **/
    count<T extends TokenUsageLogCountArgs>(
      args?: Subset<T, TokenUsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenUsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenUsageLogAggregateArgs>(args: Subset<T, TokenUsageLogAggregateArgs>): Prisma.PrismaPromise<GetTokenUsageLogAggregateType<T>>

    /**
     * Group by TokenUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUsageLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenUsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenUsageLogGroupByArgs['orderBy'] }
        : { orderBy?: TokenUsageLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenUsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenUsageLog model
   */
  readonly fields: TokenUsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenUsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenUsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenUsageLog model
   */
  interface TokenUsageLogFieldRefs {
    readonly id: FieldRef<"TokenUsageLog", 'String'>
    readonly user_id: FieldRef<"TokenUsageLog", 'String'>
    readonly input_tokens: FieldRef<"TokenUsageLog", 'Int'>
    readonly output_tokens: FieldRef<"TokenUsageLog", 'Int'>
    readonly total_tokens: FieldRef<"TokenUsageLog", 'Int'>
    readonly model_name: FieldRef<"TokenUsageLog", 'String'>
    readonly cost: FieldRef<"TokenUsageLog", 'Float'>
    readonly conversation_id: FieldRef<"TokenUsageLog", 'String'>
    readonly created_at: FieldRef<"TokenUsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TokenUsageLog findUnique
   */
  export type TokenUsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which TokenUsageLog to fetch.
     */
    where: TokenUsageLogWhereUniqueInput
  }

  /**
   * TokenUsageLog findUniqueOrThrow
   */
  export type TokenUsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which TokenUsageLog to fetch.
     */
    where: TokenUsageLogWhereUniqueInput
  }

  /**
   * TokenUsageLog findFirst
   */
  export type TokenUsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which TokenUsageLog to fetch.
     */
    where?: TokenUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenUsageLogs to fetch.
     */
    orderBy?: TokenUsageLogOrderByWithRelationInput | TokenUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenUsageLogs.
     */
    cursor?: TokenUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenUsageLogs.
     */
    distinct?: TokenUsageLogScalarFieldEnum | TokenUsageLogScalarFieldEnum[]
  }

  /**
   * TokenUsageLog findFirstOrThrow
   */
  export type TokenUsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which TokenUsageLog to fetch.
     */
    where?: TokenUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenUsageLogs to fetch.
     */
    orderBy?: TokenUsageLogOrderByWithRelationInput | TokenUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenUsageLogs.
     */
    cursor?: TokenUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenUsageLogs.
     */
    distinct?: TokenUsageLogScalarFieldEnum | TokenUsageLogScalarFieldEnum[]
  }

  /**
   * TokenUsageLog findMany
   */
  export type TokenUsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which TokenUsageLogs to fetch.
     */
    where?: TokenUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenUsageLogs to fetch.
     */
    orderBy?: TokenUsageLogOrderByWithRelationInput | TokenUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenUsageLogs.
     */
    cursor?: TokenUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenUsageLogs.
     */
    skip?: number
    distinct?: TokenUsageLogScalarFieldEnum | TokenUsageLogScalarFieldEnum[]
  }

  /**
   * TokenUsageLog create
   */
  export type TokenUsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TokenUsageLog.
     */
    data: XOR<TokenUsageLogCreateInput, TokenUsageLogUncheckedCreateInput>
  }

  /**
   * TokenUsageLog createMany
   */
  export type TokenUsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenUsageLogs.
     */
    data: TokenUsageLogCreateManyInput | TokenUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenUsageLog createManyAndReturn
   */
  export type TokenUsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * The data used to create many TokenUsageLogs.
     */
    data: TokenUsageLogCreateManyInput | TokenUsageLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenUsageLog update
   */
  export type TokenUsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TokenUsageLog.
     */
    data: XOR<TokenUsageLogUpdateInput, TokenUsageLogUncheckedUpdateInput>
    /**
     * Choose, which TokenUsageLog to update.
     */
    where: TokenUsageLogWhereUniqueInput
  }

  /**
   * TokenUsageLog updateMany
   */
  export type TokenUsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenUsageLogs.
     */
    data: XOR<TokenUsageLogUpdateManyMutationInput, TokenUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which TokenUsageLogs to update
     */
    where?: TokenUsageLogWhereInput
    /**
     * Limit how many TokenUsageLogs to update.
     */
    limit?: number
  }

  /**
   * TokenUsageLog updateManyAndReturn
   */
  export type TokenUsageLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * The data used to update TokenUsageLogs.
     */
    data: XOR<TokenUsageLogUpdateManyMutationInput, TokenUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which TokenUsageLogs to update
     */
    where?: TokenUsageLogWhereInput
    /**
     * Limit how many TokenUsageLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenUsageLog upsert
   */
  export type TokenUsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TokenUsageLog to update in case it exists.
     */
    where: TokenUsageLogWhereUniqueInput
    /**
     * In case the TokenUsageLog found by the `where` argument doesn't exist, create a new TokenUsageLog with this data.
     */
    create: XOR<TokenUsageLogCreateInput, TokenUsageLogUncheckedCreateInput>
    /**
     * In case the TokenUsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUsageLogUpdateInput, TokenUsageLogUncheckedUpdateInput>
  }

  /**
   * TokenUsageLog delete
   */
  export type TokenUsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
    /**
     * Filter which TokenUsageLog to delete.
     */
    where: TokenUsageLogWhereUniqueInput
  }

  /**
   * TokenUsageLog deleteMany
   */
  export type TokenUsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenUsageLogs to delete
     */
    where?: TokenUsageLogWhereInput
    /**
     * Limit how many TokenUsageLogs to delete.
     */
    limit?: number
  }

  /**
   * TokenUsageLog without action
   */
  export type TokenUsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenUsageLog
     */
    select?: TokenUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenUsageLog
     */
    omit?: TokenUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenUsageLogInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    created_at?: true
    updated_at?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    created_at?: true
    updated_at?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    user_id: string
    title: string
    created_at: Date
    updated_at: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    shared_conversations?: boolean | Conversation$shared_conversationsArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "created_at" | "updated_at", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    shared_conversations?: boolean | Conversation$shared_conversationsArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
      shared_conversations: Prisma.$SharedConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      title: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shared_conversations<T extends Conversation$shared_conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$shared_conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly user_id: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly created_at: FieldRef<"Conversation", 'DateTime'>
    readonly updated_at: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.shared_conversations
   */
  export type Conversation$shared_conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    where?: SharedConversationWhereInput
    orderBy?: SharedConversationOrderByWithRelationInput | SharedConversationOrderByWithRelationInput[]
    cursor?: SharedConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SharedConversationScalarFieldEnum | SharedConversationScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversation_id: string | null
    role: string | null
    content: string | null
    created_at: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversation_id: string | null
    role: string | null
    content: string | null
    created_at: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversation_id: number
    role: number
    content: number
    created_at: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversation_id?: true
    role?: true
    content?: true
    created_at?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversation_id?: true
    role?: true
    content?: true
    created_at?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversation_id?: true
    role?: true
    content?: true
    created_at?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversation_id: string
    role: string
    content: string
    created_at: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    role?: boolean
    content?: boolean
    created_at?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    images?: boolean | Message$imagesArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    role?: boolean
    content?: boolean
    created_at?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    role?: boolean
    content?: boolean
    created_at?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversation_id?: boolean
    role?: boolean
    content?: boolean
    created_at?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversation_id" | "role" | "content" | "created_at", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    images?: boolean | Message$imagesArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      images: Prisma.$MessageImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversation_id: string
      role: string
      content: string
      created_at: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Message$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Message$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversation_id: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly created_at: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.images
   */
  export type Message$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    where?: MessageImageWhereInput
    orderBy?: MessageImageOrderByWithRelationInput | MessageImageOrderByWithRelationInput[]
    cursor?: MessageImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageImageScalarFieldEnum | MessageImageScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model MessageImage
   */

  export type AggregateMessageImage = {
    _count: MessageImageCountAggregateOutputType | null
    _avg: MessageImageAvgAggregateOutputType | null
    _sum: MessageImageSumAggregateOutputType | null
    _min: MessageImageMinAggregateOutputType | null
    _max: MessageImageMaxAggregateOutputType | null
  }

  export type MessageImageAvgAggregateOutputType = {
    size: number | null
  }

  export type MessageImageSumAggregateOutputType = {
    size: number | null
  }

  export type MessageImageMinAggregateOutputType = {
    id: string | null
    message_id: string | null
    filename: string | null
    original_name: string | null
    mime_type: string | null
    size: number | null
    base64_data: string | null
    url: string | null
    created_at: Date | null
  }

  export type MessageImageMaxAggregateOutputType = {
    id: string | null
    message_id: string | null
    filename: string | null
    original_name: string | null
    mime_type: string | null
    size: number | null
    base64_data: string | null
    url: string | null
    created_at: Date | null
  }

  export type MessageImageCountAggregateOutputType = {
    id: number
    message_id: number
    filename: number
    original_name: number
    mime_type: number
    size: number
    base64_data: number
    url: number
    created_at: number
    _all: number
  }


  export type MessageImageAvgAggregateInputType = {
    size?: true
  }

  export type MessageImageSumAggregateInputType = {
    size?: true
  }

  export type MessageImageMinAggregateInputType = {
    id?: true
    message_id?: true
    filename?: true
    original_name?: true
    mime_type?: true
    size?: true
    base64_data?: true
    url?: true
    created_at?: true
  }

  export type MessageImageMaxAggregateInputType = {
    id?: true
    message_id?: true
    filename?: true
    original_name?: true
    mime_type?: true
    size?: true
    base64_data?: true
    url?: true
    created_at?: true
  }

  export type MessageImageCountAggregateInputType = {
    id?: true
    message_id?: true
    filename?: true
    original_name?: true
    mime_type?: true
    size?: true
    base64_data?: true
    url?: true
    created_at?: true
    _all?: true
  }

  export type MessageImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageImage to aggregate.
     */
    where?: MessageImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageImages to fetch.
     */
    orderBy?: MessageImageOrderByWithRelationInput | MessageImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageImages
    **/
    _count?: true | MessageImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageImageMaxAggregateInputType
  }

  export type GetMessageImageAggregateType<T extends MessageImageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageImage[P]>
      : GetScalarType<T[P], AggregateMessageImage[P]>
  }




  export type MessageImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageImageWhereInput
    orderBy?: MessageImageOrderByWithAggregationInput | MessageImageOrderByWithAggregationInput[]
    by: MessageImageScalarFieldEnum[] | MessageImageScalarFieldEnum
    having?: MessageImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageImageCountAggregateInputType | true
    _avg?: MessageImageAvgAggregateInputType
    _sum?: MessageImageSumAggregateInputType
    _min?: MessageImageMinAggregateInputType
    _max?: MessageImageMaxAggregateInputType
  }

  export type MessageImageGroupByOutputType = {
    id: string
    message_id: string
    filename: string
    original_name: string | null
    mime_type: string
    size: number
    base64_data: string
    url: string | null
    created_at: Date
    _count: MessageImageCountAggregateOutputType | null
    _avg: MessageImageAvgAggregateOutputType | null
    _sum: MessageImageSumAggregateOutputType | null
    _min: MessageImageMinAggregateOutputType | null
    _max: MessageImageMaxAggregateOutputType | null
  }

  type GetMessageImageGroupByPayload<T extends MessageImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageImageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageImageGroupByOutputType[P]>
        }
      >
    >


  export type MessageImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message_id?: boolean
    filename?: boolean
    original_name?: boolean
    mime_type?: boolean
    size?: boolean
    base64_data?: boolean
    url?: boolean
    created_at?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageImage"]>

  export type MessageImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message_id?: boolean
    filename?: boolean
    original_name?: boolean
    mime_type?: boolean
    size?: boolean
    base64_data?: boolean
    url?: boolean
    created_at?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageImage"]>

  export type MessageImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message_id?: boolean
    filename?: boolean
    original_name?: boolean
    mime_type?: boolean
    size?: boolean
    base64_data?: boolean
    url?: boolean
    created_at?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageImage"]>

  export type MessageImageSelectScalar = {
    id?: boolean
    message_id?: boolean
    filename?: boolean
    original_name?: boolean
    mime_type?: boolean
    size?: boolean
    base64_data?: boolean
    url?: boolean
    created_at?: boolean
  }

  export type MessageImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message_id" | "filename" | "original_name" | "mime_type" | "size" | "base64_data" | "url" | "created_at", ExtArgs["result"]["messageImage"]>
  export type MessageImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageImage"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message_id: string
      filename: string
      original_name: string | null
      mime_type: string
      size: number
      base64_data: string
      url: string | null
      created_at: Date
    }, ExtArgs["result"]["messageImage"]>
    composites: {}
  }

  type MessageImageGetPayload<S extends boolean | null | undefined | MessageImageDefaultArgs> = $Result.GetResult<Prisma.$MessageImagePayload, S>

  type MessageImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageImageCountAggregateInputType | true
    }

  export interface MessageImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageImage'], meta: { name: 'MessageImage' } }
    /**
     * Find zero or one MessageImage that matches the filter.
     * @param {MessageImageFindUniqueArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageImageFindUniqueArgs>(args: SelectSubset<T, MessageImageFindUniqueArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageImageFindUniqueOrThrowArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageImageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageFindFirstArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageImageFindFirstArgs>(args?: SelectSubset<T, MessageImageFindFirstArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageFindFirstOrThrowArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageImageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageImages
     * const messageImages = await prisma.messageImage.findMany()
     * 
     * // Get first 10 MessageImages
     * const messageImages = await prisma.messageImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageImageWithIdOnly = await prisma.messageImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageImageFindManyArgs>(args?: SelectSubset<T, MessageImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageImage.
     * @param {MessageImageCreateArgs} args - Arguments to create a MessageImage.
     * @example
     * // Create one MessageImage
     * const MessageImage = await prisma.messageImage.create({
     *   data: {
     *     // ... data to create a MessageImage
     *   }
     * })
     * 
     */
    create<T extends MessageImageCreateArgs>(args: SelectSubset<T, MessageImageCreateArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageImages.
     * @param {MessageImageCreateManyArgs} args - Arguments to create many MessageImages.
     * @example
     * // Create many MessageImages
     * const messageImage = await prisma.messageImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageImageCreateManyArgs>(args?: SelectSubset<T, MessageImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageImages and returns the data saved in the database.
     * @param {MessageImageCreateManyAndReturnArgs} args - Arguments to create many MessageImages.
     * @example
     * // Create many MessageImages
     * const messageImage = await prisma.messageImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageImages and only return the `id`
     * const messageImageWithIdOnly = await prisma.messageImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageImageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageImage.
     * @param {MessageImageDeleteArgs} args - Arguments to delete one MessageImage.
     * @example
     * // Delete one MessageImage
     * const MessageImage = await prisma.messageImage.delete({
     *   where: {
     *     // ... filter to delete one MessageImage
     *   }
     * })
     * 
     */
    delete<T extends MessageImageDeleteArgs>(args: SelectSubset<T, MessageImageDeleteArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageImage.
     * @param {MessageImageUpdateArgs} args - Arguments to update one MessageImage.
     * @example
     * // Update one MessageImage
     * const messageImage = await prisma.messageImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageImageUpdateArgs>(args: SelectSubset<T, MessageImageUpdateArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageImages.
     * @param {MessageImageDeleteManyArgs} args - Arguments to filter MessageImages to delete.
     * @example
     * // Delete a few MessageImages
     * const { count } = await prisma.messageImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageImageDeleteManyArgs>(args?: SelectSubset<T, MessageImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageImages
     * const messageImage = await prisma.messageImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageImageUpdateManyArgs>(args: SelectSubset<T, MessageImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageImages and returns the data updated in the database.
     * @param {MessageImageUpdateManyAndReturnArgs} args - Arguments to update many MessageImages.
     * @example
     * // Update many MessageImages
     * const messageImage = await prisma.messageImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageImages and only return the `id`
     * const messageImageWithIdOnly = await prisma.messageImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageImageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageImage.
     * @param {MessageImageUpsertArgs} args - Arguments to update or create a MessageImage.
     * @example
     * // Update or create a MessageImage
     * const messageImage = await prisma.messageImage.upsert({
     *   create: {
     *     // ... data to create a MessageImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageImage we want to update
     *   }
     * })
     */
    upsert<T extends MessageImageUpsertArgs>(args: SelectSubset<T, MessageImageUpsertArgs<ExtArgs>>): Prisma__MessageImageClient<$Result.GetResult<Prisma.$MessageImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageCountArgs} args - Arguments to filter MessageImages to count.
     * @example
     * // Count the number of MessageImages
     * const count = await prisma.messageImage.count({
     *   where: {
     *     // ... the filter for the MessageImages we want to count
     *   }
     * })
    **/
    count<T extends MessageImageCountArgs>(
      args?: Subset<T, MessageImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageImageAggregateArgs>(args: Subset<T, MessageImageAggregateArgs>): Prisma.PrismaPromise<GetMessageImageAggregateType<T>>

    /**
     * Group by MessageImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageImageGroupByArgs['orderBy'] }
        : { orderBy?: MessageImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageImage model
   */
  readonly fields: MessageImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageImage model
   */
  interface MessageImageFieldRefs {
    readonly id: FieldRef<"MessageImage", 'String'>
    readonly message_id: FieldRef<"MessageImage", 'String'>
    readonly filename: FieldRef<"MessageImage", 'String'>
    readonly original_name: FieldRef<"MessageImage", 'String'>
    readonly mime_type: FieldRef<"MessageImage", 'String'>
    readonly size: FieldRef<"MessageImage", 'Int'>
    readonly base64_data: FieldRef<"MessageImage", 'String'>
    readonly url: FieldRef<"MessageImage", 'String'>
    readonly created_at: FieldRef<"MessageImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageImage findUnique
   */
  export type MessageImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * Filter, which MessageImage to fetch.
     */
    where: MessageImageWhereUniqueInput
  }

  /**
   * MessageImage findUniqueOrThrow
   */
  export type MessageImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * Filter, which MessageImage to fetch.
     */
    where: MessageImageWhereUniqueInput
  }

  /**
   * MessageImage findFirst
   */
  export type MessageImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * Filter, which MessageImage to fetch.
     */
    where?: MessageImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageImages to fetch.
     */
    orderBy?: MessageImageOrderByWithRelationInput | MessageImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageImages.
     */
    cursor?: MessageImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageImages.
     */
    distinct?: MessageImageScalarFieldEnum | MessageImageScalarFieldEnum[]
  }

  /**
   * MessageImage findFirstOrThrow
   */
  export type MessageImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * Filter, which MessageImage to fetch.
     */
    where?: MessageImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageImages to fetch.
     */
    orderBy?: MessageImageOrderByWithRelationInput | MessageImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageImages.
     */
    cursor?: MessageImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageImages.
     */
    distinct?: MessageImageScalarFieldEnum | MessageImageScalarFieldEnum[]
  }

  /**
   * MessageImage findMany
   */
  export type MessageImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * Filter, which MessageImages to fetch.
     */
    where?: MessageImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageImages to fetch.
     */
    orderBy?: MessageImageOrderByWithRelationInput | MessageImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageImages.
     */
    cursor?: MessageImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageImages.
     */
    skip?: number
    distinct?: MessageImageScalarFieldEnum | MessageImageScalarFieldEnum[]
  }

  /**
   * MessageImage create
   */
  export type MessageImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageImage.
     */
    data: XOR<MessageImageCreateInput, MessageImageUncheckedCreateInput>
  }

  /**
   * MessageImage createMany
   */
  export type MessageImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageImages.
     */
    data: MessageImageCreateManyInput | MessageImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageImage createManyAndReturn
   */
  export type MessageImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * The data used to create many MessageImages.
     */
    data: MessageImageCreateManyInput | MessageImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageImage update
   */
  export type MessageImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageImage.
     */
    data: XOR<MessageImageUpdateInput, MessageImageUncheckedUpdateInput>
    /**
     * Choose, which MessageImage to update.
     */
    where: MessageImageWhereUniqueInput
  }

  /**
   * MessageImage updateMany
   */
  export type MessageImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageImages.
     */
    data: XOR<MessageImageUpdateManyMutationInput, MessageImageUncheckedUpdateManyInput>
    /**
     * Filter which MessageImages to update
     */
    where?: MessageImageWhereInput
    /**
     * Limit how many MessageImages to update.
     */
    limit?: number
  }

  /**
   * MessageImage updateManyAndReturn
   */
  export type MessageImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * The data used to update MessageImages.
     */
    data: XOR<MessageImageUpdateManyMutationInput, MessageImageUncheckedUpdateManyInput>
    /**
     * Filter which MessageImages to update
     */
    where?: MessageImageWhereInput
    /**
     * Limit how many MessageImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageImage upsert
   */
  export type MessageImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageImage to update in case it exists.
     */
    where: MessageImageWhereUniqueInput
    /**
     * In case the MessageImage found by the `where` argument doesn't exist, create a new MessageImage with this data.
     */
    create: XOR<MessageImageCreateInput, MessageImageUncheckedCreateInput>
    /**
     * In case the MessageImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageImageUpdateInput, MessageImageUncheckedUpdateInput>
  }

  /**
   * MessageImage delete
   */
  export type MessageImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
    /**
     * Filter which MessageImage to delete.
     */
    where: MessageImageWhereUniqueInput
  }

  /**
   * MessageImage deleteMany
   */
  export type MessageImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageImages to delete
     */
    where?: MessageImageWhereInput
    /**
     * Limit how many MessageImages to delete.
     */
    limit?: number
  }

  /**
   * MessageImage without action
   */
  export type MessageImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageImage
     */
    select?: MessageImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageImage
     */
    omit?: MessageImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageImageInclude<ExtArgs> | null
  }


  /**
   * Model SharedConversation
   */

  export type AggregateSharedConversation = {
    _count: SharedConversationCountAggregateOutputType | null
    _avg: SharedConversationAvgAggregateOutputType | null
    _sum: SharedConversationSumAggregateOutputType | null
    _min: SharedConversationMinAggregateOutputType | null
    _max: SharedConversationMaxAggregateOutputType | null
  }

  export type SharedConversationAvgAggregateOutputType = {
    view_count: number | null
  }

  export type SharedConversationSumAggregateOutputType = {
    view_count: number | null
  }

  export type SharedConversationMinAggregateOutputType = {
    id: string | null
    conversation_id: string | null
    share_id: string | null
    title: string | null
    is_public: boolean | null
    expires_at: Date | null
    view_count: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SharedConversationMaxAggregateOutputType = {
    id: string | null
    conversation_id: string | null
    share_id: string | null
    title: string | null
    is_public: boolean | null
    expires_at: Date | null
    view_count: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SharedConversationCountAggregateOutputType = {
    id: number
    conversation_id: number
    share_id: number
    title: number
    is_public: number
    expires_at: number
    view_count: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SharedConversationAvgAggregateInputType = {
    view_count?: true
  }

  export type SharedConversationSumAggregateInputType = {
    view_count?: true
  }

  export type SharedConversationMinAggregateInputType = {
    id?: true
    conversation_id?: true
    share_id?: true
    title?: true
    is_public?: true
    expires_at?: true
    view_count?: true
    created_at?: true
    updated_at?: true
  }

  export type SharedConversationMaxAggregateInputType = {
    id?: true
    conversation_id?: true
    share_id?: true
    title?: true
    is_public?: true
    expires_at?: true
    view_count?: true
    created_at?: true
    updated_at?: true
  }

  export type SharedConversationCountAggregateInputType = {
    id?: true
    conversation_id?: true
    share_id?: true
    title?: true
    is_public?: true
    expires_at?: true
    view_count?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SharedConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SharedConversation to aggregate.
     */
    where?: SharedConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedConversations to fetch.
     */
    orderBy?: SharedConversationOrderByWithRelationInput | SharedConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SharedConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SharedConversations
    **/
    _count?: true | SharedConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SharedConversationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SharedConversationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SharedConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SharedConversationMaxAggregateInputType
  }

  export type GetSharedConversationAggregateType<T extends SharedConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateSharedConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSharedConversation[P]>
      : GetScalarType<T[P], AggregateSharedConversation[P]>
  }




  export type SharedConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SharedConversationWhereInput
    orderBy?: SharedConversationOrderByWithAggregationInput | SharedConversationOrderByWithAggregationInput[]
    by: SharedConversationScalarFieldEnum[] | SharedConversationScalarFieldEnum
    having?: SharedConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SharedConversationCountAggregateInputType | true
    _avg?: SharedConversationAvgAggregateInputType
    _sum?: SharedConversationSumAggregateInputType
    _min?: SharedConversationMinAggregateInputType
    _max?: SharedConversationMaxAggregateInputType
  }

  export type SharedConversationGroupByOutputType = {
    id: string
    conversation_id: string
    share_id: string
    title: string
    is_public: boolean
    expires_at: Date | null
    view_count: number
    created_at: Date
    updated_at: Date
    _count: SharedConversationCountAggregateOutputType | null
    _avg: SharedConversationAvgAggregateOutputType | null
    _sum: SharedConversationSumAggregateOutputType | null
    _min: SharedConversationMinAggregateOutputType | null
    _max: SharedConversationMaxAggregateOutputType | null
  }

  type GetSharedConversationGroupByPayload<T extends SharedConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SharedConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SharedConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SharedConversationGroupByOutputType[P]>
            : GetScalarType<T[P], SharedConversationGroupByOutputType[P]>
        }
      >
    >


  export type SharedConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    share_id?: boolean
    title?: boolean
    is_public?: boolean
    expires_at?: boolean
    view_count?: boolean
    created_at?: boolean
    updated_at?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sharedConversation"]>

  export type SharedConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    share_id?: boolean
    title?: boolean
    is_public?: boolean
    expires_at?: boolean
    view_count?: boolean
    created_at?: boolean
    updated_at?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sharedConversation"]>

  export type SharedConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    share_id?: boolean
    title?: boolean
    is_public?: boolean
    expires_at?: boolean
    view_count?: boolean
    created_at?: boolean
    updated_at?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sharedConversation"]>

  export type SharedConversationSelectScalar = {
    id?: boolean
    conversation_id?: boolean
    share_id?: boolean
    title?: boolean
    is_public?: boolean
    expires_at?: boolean
    view_count?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SharedConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversation_id" | "share_id" | "title" | "is_public" | "expires_at" | "view_count" | "created_at" | "updated_at", ExtArgs["result"]["sharedConversation"]>
  export type SharedConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type SharedConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type SharedConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $SharedConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SharedConversation"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversation_id: string
      share_id: string
      title: string
      is_public: boolean
      expires_at: Date | null
      view_count: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["sharedConversation"]>
    composites: {}
  }

  type SharedConversationGetPayload<S extends boolean | null | undefined | SharedConversationDefaultArgs> = $Result.GetResult<Prisma.$SharedConversationPayload, S>

  type SharedConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SharedConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SharedConversationCountAggregateInputType | true
    }

  export interface SharedConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SharedConversation'], meta: { name: 'SharedConversation' } }
    /**
     * Find zero or one SharedConversation that matches the filter.
     * @param {SharedConversationFindUniqueArgs} args - Arguments to find a SharedConversation
     * @example
     * // Get one SharedConversation
     * const sharedConversation = await prisma.sharedConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SharedConversationFindUniqueArgs>(args: SelectSubset<T, SharedConversationFindUniqueArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SharedConversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SharedConversationFindUniqueOrThrowArgs} args - Arguments to find a SharedConversation
     * @example
     * // Get one SharedConversation
     * const sharedConversation = await prisma.sharedConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SharedConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, SharedConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SharedConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationFindFirstArgs} args - Arguments to find a SharedConversation
     * @example
     * // Get one SharedConversation
     * const sharedConversation = await prisma.sharedConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SharedConversationFindFirstArgs>(args?: SelectSubset<T, SharedConversationFindFirstArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SharedConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationFindFirstOrThrowArgs} args - Arguments to find a SharedConversation
     * @example
     * // Get one SharedConversation
     * const sharedConversation = await prisma.sharedConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SharedConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, SharedConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SharedConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SharedConversations
     * const sharedConversations = await prisma.sharedConversation.findMany()
     * 
     * // Get first 10 SharedConversations
     * const sharedConversations = await prisma.sharedConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sharedConversationWithIdOnly = await prisma.sharedConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SharedConversationFindManyArgs>(args?: SelectSubset<T, SharedConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SharedConversation.
     * @param {SharedConversationCreateArgs} args - Arguments to create a SharedConversation.
     * @example
     * // Create one SharedConversation
     * const SharedConversation = await prisma.sharedConversation.create({
     *   data: {
     *     // ... data to create a SharedConversation
     *   }
     * })
     * 
     */
    create<T extends SharedConversationCreateArgs>(args: SelectSubset<T, SharedConversationCreateArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SharedConversations.
     * @param {SharedConversationCreateManyArgs} args - Arguments to create many SharedConversations.
     * @example
     * // Create many SharedConversations
     * const sharedConversation = await prisma.sharedConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SharedConversationCreateManyArgs>(args?: SelectSubset<T, SharedConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SharedConversations and returns the data saved in the database.
     * @param {SharedConversationCreateManyAndReturnArgs} args - Arguments to create many SharedConversations.
     * @example
     * // Create many SharedConversations
     * const sharedConversation = await prisma.sharedConversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SharedConversations and only return the `id`
     * const sharedConversationWithIdOnly = await prisma.sharedConversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SharedConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, SharedConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SharedConversation.
     * @param {SharedConversationDeleteArgs} args - Arguments to delete one SharedConversation.
     * @example
     * // Delete one SharedConversation
     * const SharedConversation = await prisma.sharedConversation.delete({
     *   where: {
     *     // ... filter to delete one SharedConversation
     *   }
     * })
     * 
     */
    delete<T extends SharedConversationDeleteArgs>(args: SelectSubset<T, SharedConversationDeleteArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SharedConversation.
     * @param {SharedConversationUpdateArgs} args - Arguments to update one SharedConversation.
     * @example
     * // Update one SharedConversation
     * const sharedConversation = await prisma.sharedConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SharedConversationUpdateArgs>(args: SelectSubset<T, SharedConversationUpdateArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SharedConversations.
     * @param {SharedConversationDeleteManyArgs} args - Arguments to filter SharedConversations to delete.
     * @example
     * // Delete a few SharedConversations
     * const { count } = await prisma.sharedConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SharedConversationDeleteManyArgs>(args?: SelectSubset<T, SharedConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SharedConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SharedConversations
     * const sharedConversation = await prisma.sharedConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SharedConversationUpdateManyArgs>(args: SelectSubset<T, SharedConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SharedConversations and returns the data updated in the database.
     * @param {SharedConversationUpdateManyAndReturnArgs} args - Arguments to update many SharedConversations.
     * @example
     * // Update many SharedConversations
     * const sharedConversation = await prisma.sharedConversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SharedConversations and only return the `id`
     * const sharedConversationWithIdOnly = await prisma.sharedConversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SharedConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, SharedConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SharedConversation.
     * @param {SharedConversationUpsertArgs} args - Arguments to update or create a SharedConversation.
     * @example
     * // Update or create a SharedConversation
     * const sharedConversation = await prisma.sharedConversation.upsert({
     *   create: {
     *     // ... data to create a SharedConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SharedConversation we want to update
     *   }
     * })
     */
    upsert<T extends SharedConversationUpsertArgs>(args: SelectSubset<T, SharedConversationUpsertArgs<ExtArgs>>): Prisma__SharedConversationClient<$Result.GetResult<Prisma.$SharedConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SharedConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationCountArgs} args - Arguments to filter SharedConversations to count.
     * @example
     * // Count the number of SharedConversations
     * const count = await prisma.sharedConversation.count({
     *   where: {
     *     // ... the filter for the SharedConversations we want to count
     *   }
     * })
    **/
    count<T extends SharedConversationCountArgs>(
      args?: Subset<T, SharedConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SharedConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SharedConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SharedConversationAggregateArgs>(args: Subset<T, SharedConversationAggregateArgs>): Prisma.PrismaPromise<GetSharedConversationAggregateType<T>>

    /**
     * Group by SharedConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharedConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SharedConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SharedConversationGroupByArgs['orderBy'] }
        : { orderBy?: SharedConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SharedConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSharedConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SharedConversation model
   */
  readonly fields: SharedConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SharedConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SharedConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SharedConversation model
   */
  interface SharedConversationFieldRefs {
    readonly id: FieldRef<"SharedConversation", 'String'>
    readonly conversation_id: FieldRef<"SharedConversation", 'String'>
    readonly share_id: FieldRef<"SharedConversation", 'String'>
    readonly title: FieldRef<"SharedConversation", 'String'>
    readonly is_public: FieldRef<"SharedConversation", 'Boolean'>
    readonly expires_at: FieldRef<"SharedConversation", 'DateTime'>
    readonly view_count: FieldRef<"SharedConversation", 'Int'>
    readonly created_at: FieldRef<"SharedConversation", 'DateTime'>
    readonly updated_at: FieldRef<"SharedConversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SharedConversation findUnique
   */
  export type SharedConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * Filter, which SharedConversation to fetch.
     */
    where: SharedConversationWhereUniqueInput
  }

  /**
   * SharedConversation findUniqueOrThrow
   */
  export type SharedConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * Filter, which SharedConversation to fetch.
     */
    where: SharedConversationWhereUniqueInput
  }

  /**
   * SharedConversation findFirst
   */
  export type SharedConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * Filter, which SharedConversation to fetch.
     */
    where?: SharedConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedConversations to fetch.
     */
    orderBy?: SharedConversationOrderByWithRelationInput | SharedConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SharedConversations.
     */
    cursor?: SharedConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SharedConversations.
     */
    distinct?: SharedConversationScalarFieldEnum | SharedConversationScalarFieldEnum[]
  }

  /**
   * SharedConversation findFirstOrThrow
   */
  export type SharedConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * Filter, which SharedConversation to fetch.
     */
    where?: SharedConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedConversations to fetch.
     */
    orderBy?: SharedConversationOrderByWithRelationInput | SharedConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SharedConversations.
     */
    cursor?: SharedConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SharedConversations.
     */
    distinct?: SharedConversationScalarFieldEnum | SharedConversationScalarFieldEnum[]
  }

  /**
   * SharedConversation findMany
   */
  export type SharedConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * Filter, which SharedConversations to fetch.
     */
    where?: SharedConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SharedConversations to fetch.
     */
    orderBy?: SharedConversationOrderByWithRelationInput | SharedConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SharedConversations.
     */
    cursor?: SharedConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SharedConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SharedConversations.
     */
    skip?: number
    distinct?: SharedConversationScalarFieldEnum | SharedConversationScalarFieldEnum[]
  }

  /**
   * SharedConversation create
   */
  export type SharedConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a SharedConversation.
     */
    data: XOR<SharedConversationCreateInput, SharedConversationUncheckedCreateInput>
  }

  /**
   * SharedConversation createMany
   */
  export type SharedConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SharedConversations.
     */
    data: SharedConversationCreateManyInput | SharedConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SharedConversation createManyAndReturn
   */
  export type SharedConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * The data used to create many SharedConversations.
     */
    data: SharedConversationCreateManyInput | SharedConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SharedConversation update
   */
  export type SharedConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a SharedConversation.
     */
    data: XOR<SharedConversationUpdateInput, SharedConversationUncheckedUpdateInput>
    /**
     * Choose, which SharedConversation to update.
     */
    where: SharedConversationWhereUniqueInput
  }

  /**
   * SharedConversation updateMany
   */
  export type SharedConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SharedConversations.
     */
    data: XOR<SharedConversationUpdateManyMutationInput, SharedConversationUncheckedUpdateManyInput>
    /**
     * Filter which SharedConversations to update
     */
    where?: SharedConversationWhereInput
    /**
     * Limit how many SharedConversations to update.
     */
    limit?: number
  }

  /**
   * SharedConversation updateManyAndReturn
   */
  export type SharedConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * The data used to update SharedConversations.
     */
    data: XOR<SharedConversationUpdateManyMutationInput, SharedConversationUncheckedUpdateManyInput>
    /**
     * Filter which SharedConversations to update
     */
    where?: SharedConversationWhereInput
    /**
     * Limit how many SharedConversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SharedConversation upsert
   */
  export type SharedConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the SharedConversation to update in case it exists.
     */
    where: SharedConversationWhereUniqueInput
    /**
     * In case the SharedConversation found by the `where` argument doesn't exist, create a new SharedConversation with this data.
     */
    create: XOR<SharedConversationCreateInput, SharedConversationUncheckedCreateInput>
    /**
     * In case the SharedConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SharedConversationUpdateInput, SharedConversationUncheckedUpdateInput>
  }

  /**
   * SharedConversation delete
   */
  export type SharedConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
    /**
     * Filter which SharedConversation to delete.
     */
    where: SharedConversationWhereUniqueInput
  }

  /**
   * SharedConversation deleteMany
   */
  export type SharedConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SharedConversations to delete
     */
    where?: SharedConversationWhereInput
    /**
     * Limit how many SharedConversations to delete.
     */
    limit?: number
  }

  /**
   * SharedConversation without action
   */
  export type SharedConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SharedConversation
     */
    select?: SharedConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SharedConversation
     */
    omit?: SharedConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SharedConversationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    student_id: 'student_id',
    token_usage: 'token_usage',
    estimated_cost: 'estimated_cost',
    created_at: 'created_at',
    updated_at: 'updated_at',
    google_id: 'google_id',
    profile_image: 'profile_image'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenUsageLogScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    input_tokens: 'input_tokens',
    output_tokens: 'output_tokens',
    total_tokens: 'total_tokens',
    model_name: 'model_name',
    cost: 'cost',
    conversation_id: 'conversation_id',
    created_at: 'created_at'
  };

  export type TokenUsageLogScalarFieldEnum = (typeof TokenUsageLogScalarFieldEnum)[keyof typeof TokenUsageLogScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversation_id: 'conversation_id',
    role: 'role',
    content: 'content',
    created_at: 'created_at'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const MessageImageScalarFieldEnum: {
    id: 'id',
    message_id: 'message_id',
    filename: 'filename',
    original_name: 'original_name',
    mime_type: 'mime_type',
    size: 'size',
    base64_data: 'base64_data',
    url: 'url',
    created_at: 'created_at'
  };

  export type MessageImageScalarFieldEnum = (typeof MessageImageScalarFieldEnum)[keyof typeof MessageImageScalarFieldEnum]


  export const SharedConversationScalarFieldEnum: {
    id: 'id',
    conversation_id: 'conversation_id',
    share_id: 'share_id',
    title: 'title',
    is_public: 'is_public',
    expires_at: 'expires_at',
    view_count: 'view_count',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SharedConversationScalarFieldEnum = (typeof SharedConversationScalarFieldEnum)[keyof typeof SharedConversationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    student_id?: StringNullableFilter<"User"> | string | null
    token_usage?: IntFilter<"User"> | number
    estimated_cost?: FloatFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    google_id?: StringNullableFilter<"User"> | string | null
    profile_image?: StringNullableFilter<"User"> | string | null
    token_usage_logs?: TokenUsageLogListRelationFilter
    conversations?: ConversationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    student_id?: SortOrderInput | SortOrder
    token_usage?: SortOrder
    estimated_cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    google_id?: SortOrderInput | SortOrder
    profile_image?: SortOrderInput | SortOrder
    token_usage_logs?: TokenUsageLogOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    student_id?: string
    google_id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    token_usage?: IntFilter<"User"> | number
    estimated_cost?: FloatFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    profile_image?: StringNullableFilter<"User"> | string | null
    token_usage_logs?: TokenUsageLogListRelationFilter
    conversations?: ConversationListRelationFilter
  }, "id" | "email" | "student_id" | "google_id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    student_id?: SortOrderInput | SortOrder
    token_usage?: SortOrder
    estimated_cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    google_id?: SortOrderInput | SortOrder
    profile_image?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    student_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    token_usage?: IntWithAggregatesFilter<"User"> | number
    estimated_cost?: FloatWithAggregatesFilter<"User"> | number
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    google_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    profile_image?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type TokenUsageLogWhereInput = {
    AND?: TokenUsageLogWhereInput | TokenUsageLogWhereInput[]
    OR?: TokenUsageLogWhereInput[]
    NOT?: TokenUsageLogWhereInput | TokenUsageLogWhereInput[]
    id?: StringFilter<"TokenUsageLog"> | string
    user_id?: StringFilter<"TokenUsageLog"> | string
    input_tokens?: IntFilter<"TokenUsageLog"> | number
    output_tokens?: IntFilter<"TokenUsageLog"> | number
    total_tokens?: IntFilter<"TokenUsageLog"> | number
    model_name?: StringFilter<"TokenUsageLog"> | string
    cost?: FloatFilter<"TokenUsageLog"> | number
    conversation_id?: StringNullableFilter<"TokenUsageLog"> | string | null
    created_at?: DateTimeFilter<"TokenUsageLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TokenUsageLogOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    model_name?: SortOrder
    cost?: SortOrder
    conversation_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TokenUsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TokenUsageLogWhereInput | TokenUsageLogWhereInput[]
    OR?: TokenUsageLogWhereInput[]
    NOT?: TokenUsageLogWhereInput | TokenUsageLogWhereInput[]
    user_id?: StringFilter<"TokenUsageLog"> | string
    input_tokens?: IntFilter<"TokenUsageLog"> | number
    output_tokens?: IntFilter<"TokenUsageLog"> | number
    total_tokens?: IntFilter<"TokenUsageLog"> | number
    model_name?: StringFilter<"TokenUsageLog"> | string
    cost?: FloatFilter<"TokenUsageLog"> | number
    conversation_id?: StringNullableFilter<"TokenUsageLog"> | string | null
    created_at?: DateTimeFilter<"TokenUsageLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TokenUsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    model_name?: SortOrder
    cost?: SortOrder
    conversation_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: TokenUsageLogCountOrderByAggregateInput
    _avg?: TokenUsageLogAvgOrderByAggregateInput
    _max?: TokenUsageLogMaxOrderByAggregateInput
    _min?: TokenUsageLogMinOrderByAggregateInput
    _sum?: TokenUsageLogSumOrderByAggregateInput
  }

  export type TokenUsageLogScalarWhereWithAggregatesInput = {
    AND?: TokenUsageLogScalarWhereWithAggregatesInput | TokenUsageLogScalarWhereWithAggregatesInput[]
    OR?: TokenUsageLogScalarWhereWithAggregatesInput[]
    NOT?: TokenUsageLogScalarWhereWithAggregatesInput | TokenUsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenUsageLog"> | string
    user_id?: StringWithAggregatesFilter<"TokenUsageLog"> | string
    input_tokens?: IntWithAggregatesFilter<"TokenUsageLog"> | number
    output_tokens?: IntWithAggregatesFilter<"TokenUsageLog"> | number
    total_tokens?: IntWithAggregatesFilter<"TokenUsageLog"> | number
    model_name?: StringWithAggregatesFilter<"TokenUsageLog"> | string
    cost?: FloatWithAggregatesFilter<"TokenUsageLog"> | number
    conversation_id?: StringNullableWithAggregatesFilter<"TokenUsageLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"TokenUsageLog"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    user_id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    created_at?: DateTimeFilter<"Conversation"> | Date | string
    updated_at?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    shared_conversations?: SharedConversationListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    shared_conversations?: SharedConversationOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    user_id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    created_at?: DateTimeFilter<"Conversation"> | Date | string
    updated_at?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    shared_conversations?: SharedConversationListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    user_id?: StringWithAggregatesFilter<"Conversation"> | string
    title?: StringWithAggregatesFilter<"Conversation"> | string
    created_at?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversation_id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    created_at?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    images?: MessageImageListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
    images?: MessageImageOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversation_id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    created_at?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
    images?: MessageImageListRelationFilter
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversation_id?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    created_at?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type MessageImageWhereInput = {
    AND?: MessageImageWhereInput | MessageImageWhereInput[]
    OR?: MessageImageWhereInput[]
    NOT?: MessageImageWhereInput | MessageImageWhereInput[]
    id?: StringFilter<"MessageImage"> | string
    message_id?: StringFilter<"MessageImage"> | string
    filename?: StringFilter<"MessageImage"> | string
    original_name?: StringNullableFilter<"MessageImage"> | string | null
    mime_type?: StringFilter<"MessageImage"> | string
    size?: IntFilter<"MessageImage"> | number
    base64_data?: StringFilter<"MessageImage"> | string
    url?: StringNullableFilter<"MessageImage"> | string | null
    created_at?: DateTimeFilter<"MessageImage"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type MessageImageOrderByWithRelationInput = {
    id?: SortOrder
    message_id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrderInput | SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    base64_data?: SortOrder
    url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageImageWhereInput | MessageImageWhereInput[]
    OR?: MessageImageWhereInput[]
    NOT?: MessageImageWhereInput | MessageImageWhereInput[]
    message_id?: StringFilter<"MessageImage"> | string
    filename?: StringFilter<"MessageImage"> | string
    original_name?: StringNullableFilter<"MessageImage"> | string | null
    mime_type?: StringFilter<"MessageImage"> | string
    size?: IntFilter<"MessageImage"> | number
    base64_data?: StringFilter<"MessageImage"> | string
    url?: StringNullableFilter<"MessageImage"> | string | null
    created_at?: DateTimeFilter<"MessageImage"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id">

  export type MessageImageOrderByWithAggregationInput = {
    id?: SortOrder
    message_id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrderInput | SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    base64_data?: SortOrder
    url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: MessageImageCountOrderByAggregateInput
    _avg?: MessageImageAvgOrderByAggregateInput
    _max?: MessageImageMaxOrderByAggregateInput
    _min?: MessageImageMinOrderByAggregateInput
    _sum?: MessageImageSumOrderByAggregateInput
  }

  export type MessageImageScalarWhereWithAggregatesInput = {
    AND?: MessageImageScalarWhereWithAggregatesInput | MessageImageScalarWhereWithAggregatesInput[]
    OR?: MessageImageScalarWhereWithAggregatesInput[]
    NOT?: MessageImageScalarWhereWithAggregatesInput | MessageImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageImage"> | string
    message_id?: StringWithAggregatesFilter<"MessageImage"> | string
    filename?: StringWithAggregatesFilter<"MessageImage"> | string
    original_name?: StringNullableWithAggregatesFilter<"MessageImage"> | string | null
    mime_type?: StringWithAggregatesFilter<"MessageImage"> | string
    size?: IntWithAggregatesFilter<"MessageImage"> | number
    base64_data?: StringWithAggregatesFilter<"MessageImage"> | string
    url?: StringNullableWithAggregatesFilter<"MessageImage"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"MessageImage"> | Date | string
  }

  export type SharedConversationWhereInput = {
    AND?: SharedConversationWhereInput | SharedConversationWhereInput[]
    OR?: SharedConversationWhereInput[]
    NOT?: SharedConversationWhereInput | SharedConversationWhereInput[]
    id?: StringFilter<"SharedConversation"> | string
    conversation_id?: StringFilter<"SharedConversation"> | string
    share_id?: StringFilter<"SharedConversation"> | string
    title?: StringFilter<"SharedConversation"> | string
    is_public?: BoolFilter<"SharedConversation"> | boolean
    expires_at?: DateTimeNullableFilter<"SharedConversation"> | Date | string | null
    view_count?: IntFilter<"SharedConversation"> | number
    created_at?: DateTimeFilter<"SharedConversation"> | Date | string
    updated_at?: DateTimeFilter<"SharedConversation"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type SharedConversationOrderByWithRelationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    share_id?: SortOrder
    title?: SortOrder
    is_public?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    view_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type SharedConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    share_id?: string
    AND?: SharedConversationWhereInput | SharedConversationWhereInput[]
    OR?: SharedConversationWhereInput[]
    NOT?: SharedConversationWhereInput | SharedConversationWhereInput[]
    conversation_id?: StringFilter<"SharedConversation"> | string
    title?: StringFilter<"SharedConversation"> | string
    is_public?: BoolFilter<"SharedConversation"> | boolean
    expires_at?: DateTimeNullableFilter<"SharedConversation"> | Date | string | null
    view_count?: IntFilter<"SharedConversation"> | number
    created_at?: DateTimeFilter<"SharedConversation"> | Date | string
    updated_at?: DateTimeFilter<"SharedConversation"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id" | "share_id">

  export type SharedConversationOrderByWithAggregationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    share_id?: SortOrder
    title?: SortOrder
    is_public?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    view_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SharedConversationCountOrderByAggregateInput
    _avg?: SharedConversationAvgOrderByAggregateInput
    _max?: SharedConversationMaxOrderByAggregateInput
    _min?: SharedConversationMinOrderByAggregateInput
    _sum?: SharedConversationSumOrderByAggregateInput
  }

  export type SharedConversationScalarWhereWithAggregatesInput = {
    AND?: SharedConversationScalarWhereWithAggregatesInput | SharedConversationScalarWhereWithAggregatesInput[]
    OR?: SharedConversationScalarWhereWithAggregatesInput[]
    NOT?: SharedConversationScalarWhereWithAggregatesInput | SharedConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SharedConversation"> | string
    conversation_id?: StringWithAggregatesFilter<"SharedConversation"> | string
    share_id?: StringWithAggregatesFilter<"SharedConversation"> | string
    title?: StringWithAggregatesFilter<"SharedConversation"> | string
    is_public?: BoolWithAggregatesFilter<"SharedConversation"> | boolean
    expires_at?: DateTimeNullableWithAggregatesFilter<"SharedConversation"> | Date | string | null
    view_count?: IntWithAggregatesFilter<"SharedConversation"> | number
    created_at?: DateTimeWithAggregatesFilter<"SharedConversation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"SharedConversation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
    token_usage_logs?: TokenUsageLogCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
    token_usage_logs?: TokenUsageLogUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage_logs?: TokenUsageLogUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage_logs?: TokenUsageLogUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenUsageLogCreateInput = {
    id?: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutToken_usage_logsInput
  }

  export type TokenUsageLogUncheckedCreateInput = {
    id?: string
    user_id: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id?: string | null
    created_at?: Date | string
  }

  export type TokenUsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutToken_usage_logsNestedInput
  }

  export type TokenUsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUsageLogCreateManyInput = {
    id?: string
    user_id: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id?: string | null
    created_at?: Date | string
  }

  export type TokenUsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    shared_conversations?: SharedConversationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    user_id: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    shared_conversations?: SharedConversationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    shared_conversations?: SharedConversationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    shared_conversations?: SharedConversationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    user_id: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    created_at?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    images?: MessageImageCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversation_id: string
    role: string
    content: string
    created_at?: Date | string
    images?: MessageImageUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    images?: MessageImageUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversation_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: MessageImageUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id?: string
    conversation_id: string
    role: string
    content: string
    created_at?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversation_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageImageCreateInput = {
    id?: string
    filename: string
    original_name?: string | null
    mime_type: string
    size: number
    base64_data: string
    url?: string | null
    created_at?: Date | string
    message: MessageCreateNestedOneWithoutImagesInput
  }

  export type MessageImageUncheckedCreateInput = {
    id?: string
    message_id: string
    filename: string
    original_name?: string | null
    mime_type: string
    size: number
    base64_data: string
    url?: string | null
    created_at?: Date | string
  }

  export type MessageImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutImagesNestedInput
  }

  export type MessageImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message_id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageImageCreateManyInput = {
    id?: string
    message_id: string
    filename: string
    original_name?: string | null
    mime_type: string
    size: number
    base64_data: string
    url?: string | null
    created_at?: Date | string
  }

  export type MessageImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message_id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedConversationCreateInput = {
    id?: string
    share_id?: string
    title: string
    is_public?: boolean
    expires_at?: Date | string | null
    view_count?: number
    created_at?: Date | string
    updated_at?: Date | string
    conversation: ConversationCreateNestedOneWithoutShared_conversationsInput
  }

  export type SharedConversationUncheckedCreateInput = {
    id?: string
    conversation_id: string
    share_id?: string
    title: string
    is_public?: boolean
    expires_at?: Date | string | null
    view_count?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SharedConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutShared_conversationsNestedInput
  }

  export type SharedConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversation_id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedConversationCreateManyInput = {
    id?: string
    conversation_id: string
    share_id?: string
    title: string
    is_public?: boolean
    expires_at?: Date | string | null
    view_count?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SharedConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversation_id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TokenUsageLogListRelationFilter = {
    every?: TokenUsageLogWhereInput
    some?: TokenUsageLogWhereInput
    none?: TokenUsageLogWhereInput
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TokenUsageLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    student_id?: SortOrder
    token_usage?: SortOrder
    estimated_cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    google_id?: SortOrder
    profile_image?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    token_usage?: SortOrder
    estimated_cost?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    student_id?: SortOrder
    token_usage?: SortOrder
    estimated_cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    google_id?: SortOrder
    profile_image?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    student_id?: SortOrder
    token_usage?: SortOrder
    estimated_cost?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    google_id?: SortOrder
    profile_image?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    token_usage?: SortOrder
    estimated_cost?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TokenUsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    model_name?: SortOrder
    cost?: SortOrder
    conversation_id?: SortOrder
    created_at?: SortOrder
  }

  export type TokenUsageLogAvgOrderByAggregateInput = {
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    cost?: SortOrder
  }

  export type TokenUsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    model_name?: SortOrder
    cost?: SortOrder
    conversation_id?: SortOrder
    created_at?: SortOrder
  }

  export type TokenUsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    model_name?: SortOrder
    cost?: SortOrder
    conversation_id?: SortOrder
    created_at?: SortOrder
  }

  export type TokenUsageLogSumOrderByAggregateInput = {
    input_tokens?: SortOrder
    output_tokens?: SortOrder
    total_tokens?: SortOrder
    cost?: SortOrder
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type SharedConversationListRelationFilter = {
    every?: SharedConversationWhereInput
    some?: SharedConversationWhereInput
    none?: SharedConversationWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SharedConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageImageListRelationFilter = {
    every?: MessageImageWhereInput
    some?: MessageImageWhereInput
    none?: MessageImageWhereInput
  }

  export type MessageImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type MessageImageCountOrderByAggregateInput = {
    id?: SortOrder
    message_id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    base64_data?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type MessageImageAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type MessageImageMaxOrderByAggregateInput = {
    id?: SortOrder
    message_id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    base64_data?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type MessageImageMinOrderByAggregateInput = {
    id?: SortOrder
    message_id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    base64_data?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type MessageImageSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SharedConversationCountOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    share_id?: SortOrder
    title?: SortOrder
    is_public?: SortOrder
    expires_at?: SortOrder
    view_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SharedConversationAvgOrderByAggregateInput = {
    view_count?: SortOrder
  }

  export type SharedConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    share_id?: SortOrder
    title?: SortOrder
    is_public?: SortOrder
    expires_at?: SortOrder
    view_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SharedConversationMinOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    share_id?: SortOrder
    title?: SortOrder
    is_public?: SortOrder
    expires_at?: SortOrder
    view_count?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SharedConversationSumOrderByAggregateInput = {
    view_count?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TokenUsageLogCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenUsageLogCreateWithoutUserInput, TokenUsageLogUncheckedCreateWithoutUserInput> | TokenUsageLogCreateWithoutUserInput[] | TokenUsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenUsageLogCreateOrConnectWithoutUserInput | TokenUsageLogCreateOrConnectWithoutUserInput[]
    createMany?: TokenUsageLogCreateManyUserInputEnvelope
    connect?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type TokenUsageLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenUsageLogCreateWithoutUserInput, TokenUsageLogUncheckedCreateWithoutUserInput> | TokenUsageLogCreateWithoutUserInput[] | TokenUsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenUsageLogCreateOrConnectWithoutUserInput | TokenUsageLogCreateOrConnectWithoutUserInput[]
    createMany?: TokenUsageLogCreateManyUserInputEnvelope
    connect?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TokenUsageLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenUsageLogCreateWithoutUserInput, TokenUsageLogUncheckedCreateWithoutUserInput> | TokenUsageLogCreateWithoutUserInput[] | TokenUsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenUsageLogCreateOrConnectWithoutUserInput | TokenUsageLogCreateOrConnectWithoutUserInput[]
    upsert?: TokenUsageLogUpsertWithWhereUniqueWithoutUserInput | TokenUsageLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenUsageLogCreateManyUserInputEnvelope
    set?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    disconnect?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    delete?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    connect?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    update?: TokenUsageLogUpdateWithWhereUniqueWithoutUserInput | TokenUsageLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUsageLogUpdateManyWithWhereWithoutUserInput | TokenUsageLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenUsageLogScalarWhereInput | TokenUsageLogScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type TokenUsageLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenUsageLogCreateWithoutUserInput, TokenUsageLogUncheckedCreateWithoutUserInput> | TokenUsageLogCreateWithoutUserInput[] | TokenUsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenUsageLogCreateOrConnectWithoutUserInput | TokenUsageLogCreateOrConnectWithoutUserInput[]
    upsert?: TokenUsageLogUpsertWithWhereUniqueWithoutUserInput | TokenUsageLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenUsageLogCreateManyUserInputEnvelope
    set?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    disconnect?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    delete?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    connect?: TokenUsageLogWhereUniqueInput | TokenUsageLogWhereUniqueInput[]
    update?: TokenUsageLogUpdateWithWhereUniqueWithoutUserInput | TokenUsageLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUsageLogUpdateManyWithWhereWithoutUserInput | TokenUsageLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenUsageLogScalarWhereInput | TokenUsageLogScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutToken_usage_logsInput = {
    create?: XOR<UserCreateWithoutToken_usage_logsInput, UserUncheckedCreateWithoutToken_usage_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutToken_usage_logsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutToken_usage_logsNestedInput = {
    create?: XOR<UserCreateWithoutToken_usage_logsInput, UserUncheckedCreateWithoutToken_usage_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutToken_usage_logsInput
    upsert?: UserUpsertWithoutToken_usage_logsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutToken_usage_logsInput, UserUpdateWithoutToken_usage_logsInput>, UserUncheckedUpdateWithoutToken_usage_logsInput>
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type SharedConversationCreateNestedManyWithoutConversationInput = {
    create?: XOR<SharedConversationCreateWithoutConversationInput, SharedConversationUncheckedCreateWithoutConversationInput> | SharedConversationCreateWithoutConversationInput[] | SharedConversationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedConversationCreateOrConnectWithoutConversationInput | SharedConversationCreateOrConnectWithoutConversationInput[]
    createMany?: SharedConversationCreateManyConversationInputEnvelope
    connect?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type SharedConversationUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<SharedConversationCreateWithoutConversationInput, SharedConversationUncheckedCreateWithoutConversationInput> | SharedConversationCreateWithoutConversationInput[] | SharedConversationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedConversationCreateOrConnectWithoutConversationInput | SharedConversationCreateOrConnectWithoutConversationInput[]
    createMany?: SharedConversationCreateManyConversationInputEnvelope
    connect?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type SharedConversationUpdateManyWithoutConversationNestedInput = {
    create?: XOR<SharedConversationCreateWithoutConversationInput, SharedConversationUncheckedCreateWithoutConversationInput> | SharedConversationCreateWithoutConversationInput[] | SharedConversationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedConversationCreateOrConnectWithoutConversationInput | SharedConversationCreateOrConnectWithoutConversationInput[]
    upsert?: SharedConversationUpsertWithWhereUniqueWithoutConversationInput | SharedConversationUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: SharedConversationCreateManyConversationInputEnvelope
    set?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    disconnect?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    delete?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    connect?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    update?: SharedConversationUpdateWithWhereUniqueWithoutConversationInput | SharedConversationUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: SharedConversationUpdateManyWithWhereWithoutConversationInput | SharedConversationUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: SharedConversationScalarWhereInput | SharedConversationScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type SharedConversationUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<SharedConversationCreateWithoutConversationInput, SharedConversationUncheckedCreateWithoutConversationInput> | SharedConversationCreateWithoutConversationInput[] | SharedConversationUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SharedConversationCreateOrConnectWithoutConversationInput | SharedConversationCreateOrConnectWithoutConversationInput[]
    upsert?: SharedConversationUpsertWithWhereUniqueWithoutConversationInput | SharedConversationUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: SharedConversationCreateManyConversationInputEnvelope
    set?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    disconnect?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    delete?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    connect?: SharedConversationWhereUniqueInput | SharedConversationWhereUniqueInput[]
    update?: SharedConversationUpdateWithWhereUniqueWithoutConversationInput | SharedConversationUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: SharedConversationUpdateManyWithWhereWithoutConversationInput | SharedConversationUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: SharedConversationScalarWhereInput | SharedConversationScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type MessageImageCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageImageCreateWithoutMessageInput, MessageImageUncheckedCreateWithoutMessageInput> | MessageImageCreateWithoutMessageInput[] | MessageImageUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageImageCreateOrConnectWithoutMessageInput | MessageImageCreateOrConnectWithoutMessageInput[]
    createMany?: MessageImageCreateManyMessageInputEnvelope
    connect?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
  }

  export type MessageImageUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageImageCreateWithoutMessageInput, MessageImageUncheckedCreateWithoutMessageInput> | MessageImageCreateWithoutMessageInput[] | MessageImageUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageImageCreateOrConnectWithoutMessageInput | MessageImageCreateOrConnectWithoutMessageInput[]
    createMany?: MessageImageCreateManyMessageInputEnvelope
    connect?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type MessageImageUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageImageCreateWithoutMessageInput, MessageImageUncheckedCreateWithoutMessageInput> | MessageImageCreateWithoutMessageInput[] | MessageImageUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageImageCreateOrConnectWithoutMessageInput | MessageImageCreateOrConnectWithoutMessageInput[]
    upsert?: MessageImageUpsertWithWhereUniqueWithoutMessageInput | MessageImageUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageImageCreateManyMessageInputEnvelope
    set?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    disconnect?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    delete?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    connect?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    update?: MessageImageUpdateWithWhereUniqueWithoutMessageInput | MessageImageUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageImageUpdateManyWithWhereWithoutMessageInput | MessageImageUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageImageScalarWhereInput | MessageImageScalarWhereInput[]
  }

  export type MessageImageUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageImageCreateWithoutMessageInput, MessageImageUncheckedCreateWithoutMessageInput> | MessageImageCreateWithoutMessageInput[] | MessageImageUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageImageCreateOrConnectWithoutMessageInput | MessageImageCreateOrConnectWithoutMessageInput[]
    upsert?: MessageImageUpsertWithWhereUniqueWithoutMessageInput | MessageImageUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageImageCreateManyMessageInputEnvelope
    set?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    disconnect?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    delete?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    connect?: MessageImageWhereUniqueInput | MessageImageWhereUniqueInput[]
    update?: MessageImageUpdateWithWhereUniqueWithoutMessageInput | MessageImageUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageImageUpdateManyWithWhereWithoutMessageInput | MessageImageUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageImageScalarWhereInput | MessageImageScalarWhereInput[]
  }

  export type MessageCreateNestedOneWithoutImagesInput = {
    create?: XOR<MessageCreateWithoutImagesInput, MessageUncheckedCreateWithoutImagesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutImagesInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<MessageCreateWithoutImagesInput, MessageUncheckedCreateWithoutImagesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutImagesInput
    upsert?: MessageUpsertWithoutImagesInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutImagesInput, MessageUpdateWithoutImagesInput>, MessageUncheckedUpdateWithoutImagesInput>
  }

  export type ConversationCreateNestedOneWithoutShared_conversationsInput = {
    create?: XOR<ConversationCreateWithoutShared_conversationsInput, ConversationUncheckedCreateWithoutShared_conversationsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutShared_conversationsInput
    connect?: ConversationWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateOneRequiredWithoutShared_conversationsNestedInput = {
    create?: XOR<ConversationCreateWithoutShared_conversationsInput, ConversationUncheckedCreateWithoutShared_conversationsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutShared_conversationsInput
    upsert?: ConversationUpsertWithoutShared_conversationsInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutShared_conversationsInput, ConversationUpdateWithoutShared_conversationsInput>, ConversationUncheckedUpdateWithoutShared_conversationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TokenUsageLogCreateWithoutUserInput = {
    id?: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id?: string | null
    created_at?: Date | string
  }

  export type TokenUsageLogUncheckedCreateWithoutUserInput = {
    id?: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id?: string | null
    created_at?: Date | string
  }

  export type TokenUsageLogCreateOrConnectWithoutUserInput = {
    where: TokenUsageLogWhereUniqueInput
    create: XOR<TokenUsageLogCreateWithoutUserInput, TokenUsageLogUncheckedCreateWithoutUserInput>
  }

  export type TokenUsageLogCreateManyUserInputEnvelope = {
    data: TokenUsageLogCreateManyUserInput | TokenUsageLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    shared_conversations?: SharedConversationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    shared_conversations?: SharedConversationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenUsageLogUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenUsageLogWhereUniqueInput
    update: XOR<TokenUsageLogUpdateWithoutUserInput, TokenUsageLogUncheckedUpdateWithoutUserInput>
    create: XOR<TokenUsageLogCreateWithoutUserInput, TokenUsageLogUncheckedCreateWithoutUserInput>
  }

  export type TokenUsageLogUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenUsageLogWhereUniqueInput
    data: XOR<TokenUsageLogUpdateWithoutUserInput, TokenUsageLogUncheckedUpdateWithoutUserInput>
  }

  export type TokenUsageLogUpdateManyWithWhereWithoutUserInput = {
    where: TokenUsageLogScalarWhereInput
    data: XOR<TokenUsageLogUpdateManyMutationInput, TokenUsageLogUncheckedUpdateManyWithoutUserInput>
  }

  export type TokenUsageLogScalarWhereInput = {
    AND?: TokenUsageLogScalarWhereInput | TokenUsageLogScalarWhereInput[]
    OR?: TokenUsageLogScalarWhereInput[]
    NOT?: TokenUsageLogScalarWhereInput | TokenUsageLogScalarWhereInput[]
    id?: StringFilter<"TokenUsageLog"> | string
    user_id?: StringFilter<"TokenUsageLog"> | string
    input_tokens?: IntFilter<"TokenUsageLog"> | number
    output_tokens?: IntFilter<"TokenUsageLog"> | number
    total_tokens?: IntFilter<"TokenUsageLog"> | number
    model_name?: StringFilter<"TokenUsageLog"> | string
    cost?: FloatFilter<"TokenUsageLog"> | number
    conversation_id?: StringNullableFilter<"TokenUsageLog"> | string | null
    created_at?: DateTimeFilter<"TokenUsageLog"> | Date | string
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    user_id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    created_at?: DateTimeFilter<"Conversation"> | Date | string
    updated_at?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type UserCreateWithoutToken_usage_logsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
    conversations?: ConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutToken_usage_logsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutToken_usage_logsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutToken_usage_logsInput, UserUncheckedCreateWithoutToken_usage_logsInput>
  }

  export type UserUpsertWithoutToken_usage_logsInput = {
    update: XOR<UserUpdateWithoutToken_usage_logsInput, UserUncheckedUpdateWithoutToken_usage_logsInput>
    create: XOR<UserCreateWithoutToken_usage_logsInput, UserUncheckedCreateWithoutToken_usage_logsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutToken_usage_logsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutToken_usage_logsInput, UserUncheckedUpdateWithoutToken_usage_logsInput>
  }

  export type UserUpdateWithoutToken_usage_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    conversations?: ConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutToken_usage_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
    token_usage_logs?: TokenUsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    student_id?: string | null
    token_usage?: number
    estimated_cost?: number
    created_at?: Date | string
    updated_at?: Date | string
    google_id?: string | null
    profile_image?: string | null
    token_usage_logs?: TokenUsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    created_at?: Date | string
    images?: MessageImageCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    created_at?: Date | string
    images?: MessageImageUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type SharedConversationCreateWithoutConversationInput = {
    id?: string
    share_id?: string
    title: string
    is_public?: boolean
    expires_at?: Date | string | null
    view_count?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SharedConversationUncheckedCreateWithoutConversationInput = {
    id?: string
    share_id?: string
    title: string
    is_public?: boolean
    expires_at?: Date | string | null
    view_count?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SharedConversationCreateOrConnectWithoutConversationInput = {
    where: SharedConversationWhereUniqueInput
    create: XOR<SharedConversationCreateWithoutConversationInput, SharedConversationUncheckedCreateWithoutConversationInput>
  }

  export type SharedConversationCreateManyConversationInputEnvelope = {
    data: SharedConversationCreateManyConversationInput | SharedConversationCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage_logs?: TokenUsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    student_id?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage?: IntFieldUpdateOperationsInput | number
    estimated_cost?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    token_usage_logs?: TokenUsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversation_id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    created_at?: DateTimeFilter<"Message"> | Date | string
  }

  export type SharedConversationUpsertWithWhereUniqueWithoutConversationInput = {
    where: SharedConversationWhereUniqueInput
    update: XOR<SharedConversationUpdateWithoutConversationInput, SharedConversationUncheckedUpdateWithoutConversationInput>
    create: XOR<SharedConversationCreateWithoutConversationInput, SharedConversationUncheckedCreateWithoutConversationInput>
  }

  export type SharedConversationUpdateWithWhereUniqueWithoutConversationInput = {
    where: SharedConversationWhereUniqueInput
    data: XOR<SharedConversationUpdateWithoutConversationInput, SharedConversationUncheckedUpdateWithoutConversationInput>
  }

  export type SharedConversationUpdateManyWithWhereWithoutConversationInput = {
    where: SharedConversationScalarWhereInput
    data: XOR<SharedConversationUpdateManyMutationInput, SharedConversationUncheckedUpdateManyWithoutConversationInput>
  }

  export type SharedConversationScalarWhereInput = {
    AND?: SharedConversationScalarWhereInput | SharedConversationScalarWhereInput[]
    OR?: SharedConversationScalarWhereInput[]
    NOT?: SharedConversationScalarWhereInput | SharedConversationScalarWhereInput[]
    id?: StringFilter<"SharedConversation"> | string
    conversation_id?: StringFilter<"SharedConversation"> | string
    share_id?: StringFilter<"SharedConversation"> | string
    title?: StringFilter<"SharedConversation"> | string
    is_public?: BoolFilter<"SharedConversation"> | boolean
    expires_at?: DateTimeNullableFilter<"SharedConversation"> | Date | string | null
    view_count?: IntFilter<"SharedConversation"> | number
    created_at?: DateTimeFilter<"SharedConversation"> | Date | string
    updated_at?: DateTimeFilter<"SharedConversation"> | Date | string
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    shared_conversations?: SharedConversationCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    user_id: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    shared_conversations?: SharedConversationUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type MessageImageCreateWithoutMessageInput = {
    id?: string
    filename: string
    original_name?: string | null
    mime_type: string
    size: number
    base64_data: string
    url?: string | null
    created_at?: Date | string
  }

  export type MessageImageUncheckedCreateWithoutMessageInput = {
    id?: string
    filename: string
    original_name?: string | null
    mime_type: string
    size: number
    base64_data: string
    url?: string | null
    created_at?: Date | string
  }

  export type MessageImageCreateOrConnectWithoutMessageInput = {
    where: MessageImageWhereUniqueInput
    create: XOR<MessageImageCreateWithoutMessageInput, MessageImageUncheckedCreateWithoutMessageInput>
  }

  export type MessageImageCreateManyMessageInputEnvelope = {
    data: MessageImageCreateManyMessageInput | MessageImageCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    shared_conversations?: SharedConversationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    shared_conversations?: SharedConversationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type MessageImageUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageImageWhereUniqueInput
    update: XOR<MessageImageUpdateWithoutMessageInput, MessageImageUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageImageCreateWithoutMessageInput, MessageImageUncheckedCreateWithoutMessageInput>
  }

  export type MessageImageUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageImageWhereUniqueInput
    data: XOR<MessageImageUpdateWithoutMessageInput, MessageImageUncheckedUpdateWithoutMessageInput>
  }

  export type MessageImageUpdateManyWithWhereWithoutMessageInput = {
    where: MessageImageScalarWhereInput
    data: XOR<MessageImageUpdateManyMutationInput, MessageImageUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageImageScalarWhereInput = {
    AND?: MessageImageScalarWhereInput | MessageImageScalarWhereInput[]
    OR?: MessageImageScalarWhereInput[]
    NOT?: MessageImageScalarWhereInput | MessageImageScalarWhereInput[]
    id?: StringFilter<"MessageImage"> | string
    message_id?: StringFilter<"MessageImage"> | string
    filename?: StringFilter<"MessageImage"> | string
    original_name?: StringNullableFilter<"MessageImage"> | string | null
    mime_type?: StringFilter<"MessageImage"> | string
    size?: IntFilter<"MessageImage"> | number
    base64_data?: StringFilter<"MessageImage"> | string
    url?: StringNullableFilter<"MessageImage"> | string | null
    created_at?: DateTimeFilter<"MessageImage"> | Date | string
  }

  export type MessageCreateWithoutImagesInput = {
    id?: string
    role: string
    content: string
    created_at?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutImagesInput = {
    id?: string
    conversation_id: string
    role: string
    content: string
    created_at?: Date | string
  }

  export type MessageCreateOrConnectWithoutImagesInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutImagesInput, MessageUncheckedCreateWithoutImagesInput>
  }

  export type MessageUpsertWithoutImagesInput = {
    update: XOR<MessageUpdateWithoutImagesInput, MessageUncheckedUpdateWithoutImagesInput>
    create: XOR<MessageCreateWithoutImagesInput, MessageUncheckedCreateWithoutImagesInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutImagesInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutImagesInput, MessageUncheckedUpdateWithoutImagesInput>
  }

  export type MessageUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversation_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateWithoutShared_conversationsInput = {
    id?: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutShared_conversationsInput = {
    id?: string
    user_id: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutShared_conversationsInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutShared_conversationsInput, ConversationUncheckedCreateWithoutShared_conversationsInput>
  }

  export type ConversationUpsertWithoutShared_conversationsInput = {
    update: XOR<ConversationUpdateWithoutShared_conversationsInput, ConversationUncheckedUpdateWithoutShared_conversationsInput>
    create: XOR<ConversationCreateWithoutShared_conversationsInput, ConversationUncheckedCreateWithoutShared_conversationsInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutShared_conversationsInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutShared_conversationsInput, ConversationUncheckedUpdateWithoutShared_conversationsInput>
  }

  export type ConversationUpdateWithoutShared_conversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutShared_conversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type TokenUsageLogCreateManyUserInput = {
    id?: string
    input_tokens: number
    output_tokens: number
    total_tokens: number
    model_name: string
    cost: number
    conversation_id?: string | null
    created_at?: Date | string
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    title?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TokenUsageLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUsageLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUsageLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    input_tokens?: IntFieldUpdateOperationsInput | number
    output_tokens?: IntFieldUpdateOperationsInput | number
    total_tokens?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    conversation_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    shared_conversations?: SharedConversationUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    shared_conversations?: SharedConversationUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    created_at?: Date | string
  }

  export type SharedConversationCreateManyConversationInput = {
    id?: string
    share_id?: string
    title: string
    is_public?: boolean
    expires_at?: Date | string | null
    view_count?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: MessageImageUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: MessageImageUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedConversationUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedConversationUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SharedConversationUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    share_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    view_count?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageImageCreateManyMessageInput = {
    id?: string
    filename: string
    original_name?: string | null
    mime_type: string
    size: number
    base64_data: string
    url?: string | null
    created_at?: Date | string
  }

  export type MessageImageUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageImageUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageImageUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    base64_data?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}