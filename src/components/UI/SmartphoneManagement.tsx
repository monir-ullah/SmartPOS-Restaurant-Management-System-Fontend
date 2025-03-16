import { Slider, DatePicker, Input, Select, Row, Col } from "antd";
import Smartphones from "./Smartphones";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setSmartphoneQueryState } from "../../redux/features/smartphone/smartphoneSlice";

const { RangePicker } = DatePicker;
const { Search } = Input;

const SmartphoneManagement = () => {
  // Getting dispatch from redux
  const dispatch = useAppDispatch();

  // query state for finding data from mongodb
  const [query, setQuery] = useState({});

  useEffect(() => {
    dispatch(setSmartphoneQueryState(query));
  }, [query, dispatch]);

  // this is for operating system option . used in the form input field as some select type value. .
  const operatingSystemOptions = [
    { value: "ios", label: "iOS" },
    { value: "android", label: "Android" },
  ];

  return (
    <div>
      <h2>Smartphone Management</h2>

      <div style={{ marginTop: "1.6rem" }}>
        <Row
          // justify="space-around"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {/* Smartphone Name */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            {/* Setting name in the query object */}
            <span style={{ fontWeight: "bold" }}>Smartphone Name</span>
            <br />
            <Search
              placeholder="Search By Smartphone Name"
              onSearch={(value) =>
                setQuery((prev) => ({ ...prev, model: value }))
              }
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Col>

          {/* Price */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            <span style={{ textAlign: "center", fontWeight: "bold" }}>
              Price $
            </span>
            <Slider
              range
              min={0}
              max={5000}
              style={{ width: "80%" }}
              onChangeComplete={(value) => {
                setQuery((prev) => ({ ...prev, price: value }));
              }}
            />
          </Col>

          {/* Release Date */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Release Date</span>
            <RangePicker
              onChange={(_date, dateString) => {
                setQuery((prev) => ({ ...prev, releaseDate: dateString }));
              }}
            />
          </Col>

          {/* Select Storage Capacity*/}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Select Storage</span>
            <br />
            <Select
              defaultValue="Select Storage"
              onChange={(value) =>
                setQuery((prev) => ({ ...prev, storageCapacity: value }))
              }
              options={[
                { value: "16GB", label: "16 GB" },
                { value: "32GB", label: "32 GB" },
                { value: "64GB", label: "64 GB" },
                { value: "128GB", label: "128 GB" },
                { value: "512GB", label: "512 GB" },
              ]}
            />
          </Col>

          {/* Search Model */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Search Model</span>
            <br />
            <Search
              placeholder="Search Model"
              onSearch={(value) =>
                setQuery((prev) => ({ ...prev, model: value }))
              }
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, model: e.target.value }))
              }
            />
          </Col>

          {/* Search By Screen Size */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Search By Screen Size </span>
            <br />
            <Search
              placeholder=" By Screen Size "
              onSearch={(value) =>
                setQuery((prev) => ({ ...prev, screenSize: value }))
              }
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, screenSize: e.target.value }))
              }
            />
          </Col>

          {/* Search Brand */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Search Brand</span>
            <br />
            <Search
              placeholder="Search Brand"
              onSearch={(value) =>
                setQuery((prev) => ({ ...prev, brand: value }))
              }
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, brand: e.target.value }))
              }
            />
          </Col>

          {/* Operating System */}
          <Col
            className="gutter-row sm-xm-margin-bottom"
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            xxl={3}
            style={{
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Operating System</span>
            <br />
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select Operating System"
              onChange={(value) =>
                setQuery((prev) => ({ ...prev, operatingSystem: value }))
              }
              tokenSeparators={[","]}
              options={operatingSystemOptions}
            />
          </Col>
        </Row>

        {/* Smart Phone */}
        <div style={{ marginTop: "1.2rem" }}>
          <Smartphones />
        </div>
      </div>
    </div>
  );
};

export default SmartphoneManagement;
