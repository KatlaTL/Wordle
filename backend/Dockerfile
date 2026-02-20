# Stage 1: Build and test
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj first for caching
COPY WordleApi/*.csproj WordleApi/
COPY WordleApi.Tests/*.csproj WordleApi.Tests/

# Restore dependencies
RUN dotnet restore WordleApi/WordleApi.csproj
RUN dotnet restore WordleApi.Tests/WordleApi.Tests.csproj

# Copy everything
COPY WordleApi/ WordleApi/
COPY WordleApi.Tests/ WordleApi.Tests/

# Build and test
RUN dotnet build WordleApi/WordleApi.csproj -c Release
RUN dotnet build WordleApi.Tests/WordleApi.Tests.csproj -c Release
RUN dotnet test WordleApi.Tests/WordleApi.Tests.csproj -c Release --verbosity normal

# Publish the backend
RUN dotnet publish WordleApi/WordleApi.csproj -c Release -o /app/publish

# Stage 2: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "WordleApi.dll"]